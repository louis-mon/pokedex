package controllers

import javax.inject.Inject

import models.PokemonRawData
import play.api.Logger
import play.api.cache.CacheApi
import play.api.libs.ws._
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent._

class PokemonRawDataService @Inject()(ws: WSClient, cache: CacheApi)(implicit context: ExecutionContext) {
  val baseApi = "http://pokeapi.co/api/v2/"

  private def fetchPokemon(url: String): Future[PokemonRawData] =
    ws.url(url)
      .get()
      .map(response => response.json.as[PokemonRawData])

  type PokemonList = Vector[PokemonRawData]
  private def fetchPokemons(acc: PokemonList, url: String): Future[PokemonList] =
    ws.url(url)
      .get()
      .map(response => response.json)
      .flatMap(json => (json \ "next").get match {
        case JsNull => Future(acc)
        case JsString(next) => (json \ "results").get match {
          case JsArray(pokemonLinks) =>
            fetchPokemons(acc ++ pokemonLinks.map(_.as[PokemonRawData]), next)
        }})

  def list = cache.getOrElse[Future[PokemonList]]("pokemons") {
    Logger.info("Fetch all pokemons")
    fetchPokemons(Vector(), s"${baseApi}pokemon")
  }
}
