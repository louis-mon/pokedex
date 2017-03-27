package services

import java.io._
import javax.inject.Inject

import akka.util.ByteString
import model.Pokemon
import play.api.Logger
import play.api.cache.CacheApi
import play.api.libs.json._
import play.api.libs.ws._

import scala.concurrent._
import scala.concurrent.duration.Duration
import scala.io.Source

class PokemonRawDataService @Inject()(ws: WSClient, cacheApi: CacheApi)(implicit context: ExecutionContext) {
  private val baseApi = "http://pokeapi.co/api/v2/"

  private val rawDataPath = "pokemon.rawData"

  def storeRawData(): Future[Unit] = {
    val writer = new PrintWriter(rawDataPath)

    def fetchPokemon(url: String) =
      ws.url(url)
        .withRequestTimeout(Duration.Inf)
        .get()
        .map { response =>
          Logger.info(s"Fetched $url")
          writer.println(response.body)
          Thread.sleep(300)
        }

    ws.url(s"${baseApi}pokemon?limit=10000")
      .get()
      .map(_.json)
      .flatMap(json => (json \\ "url")
        .map(_.as[String])
        .foldLeft(Future(())) { (acc, url) =>
          acc.flatMap(_ => fetchPokemon(url))
        })
      .map(_ => writer.close())
  }

  def getList: Vector[Pokemon] = cacheApi.getOrElse("pokemons") {
    resource.managed(Source.fromFile(rawDataPath))
      .acquireAndGet(_.getLines()
        .map(Json.parse)
        .map(Pokemon.fromJson)
        .toVector)
  }

  def getImage(pokemon: Pokemon): Option[Future[ByteString]] =
    pokemon.imageLink.map(imageLink =>
      cacheApi.get[ByteString](s"pokemonImage.${pokemon.name}")
        .map(Future[ByteString](_))
        .getOrElse(
          ws.url(imageLink)
            .get()
            .map { response =>
              cacheApi.set(s"pokemonImage.${pokemon.name}", response.bodyAsBytes)
              response.bodyAsBytes
            }))

  def getPokemon(name: String): Option[Pokemon] =
    cacheApi.getOrElse("pokemonsByName") {
      getList.map(pokemon => pokemon.name -> pokemon).toMap
    }
      .get(name)
}
