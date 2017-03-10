package services

import java.io._
import javax.inject.Inject

import model.Pokemon
import play.api.Logger
import play.api.cache.CacheApi
import play.api.libs.json._
import play.api.libs.ws._

import scala.concurrent._
import scala.concurrent.duration.Duration
import scala.io.Source

class PokemonRawDataService @Inject()(ws: WSClient, cacheApi: CacheApi)(implicit context: ExecutionContext) {
  val baseApi = "http://pokeapi.co/api/v2/"

  private def fetchPokemon(json: JsValue): Future[JsValue] =
    ws.url((json \ "url").as[String])
      .withRequestTimeout(Duration.Inf)
      .get()
      .map(response => response.json)

  type PokemonList = Vector[JsValue]

  private def fetchPokemons(writer: PrintWriter, writen: Int, url: String): Future[Unit] =
    ws.url(url)
      .withRequestTimeout(Duration.Inf)
      .get()
      .map(response => response.json)
      .flatMap(json => (json \ "next").get match {
        case JsNull => Future()
        case JsString(next) => (json \ "results").get match {
          case JsArray(pokemonLinks) =>
            Logger.info(s"Written $writen / ${(json \ "count").as[Int]} so far")
            Future.sequence(pokemonLinks.map(fetchPokemon)).flatMap(rawData => {
              rawData.foreach(rawPokemon => writer.println(Json.stringify(rawPokemon)))
              Thread.sleep(3000)
              fetchPokemons(writer, writen + rawData.size, next)
            })
        }
      })

  val rawDataPath = "pokemon.rawData"

  def storeRawData(): Future[Unit] = {
    val writer = new PrintWriter(rawDataPath)
    fetchPokemons(writer, 0, s"${baseApi}pokemon")
      .map(_ => {
        writer.close()
      })
  }

  def get: Vector[Pokemon] = cacheApi.getOrElse("pokemons") {
    Source.fromFile(rawDataPath)
      .getLines()
      .map(Json.parse)
        .map(json => Pokemon((json \ "name").as[String]))
      .toVector
  }
}
