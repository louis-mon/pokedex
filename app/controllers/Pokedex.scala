package controllers

import javax.inject.Inject

import play.api.libs.json._
import play.api.mvc._
import services.PokemonRawDataService

import scala.concurrent.{ExecutionContext, Future}

class Pokedex @Inject()(rawData: PokemonRawDataService)(implicit context: ExecutionContext) extends Controller {
  def list(name: String) = Action {
    Ok(Json.toJson(
      rawData.getList
        .map(_.name)
        .filter(_.contains(name))
    ))
      .withHeaders("Access-Control-Allow-Origin" -> "*")
  }

  def pokemon(name: String) = Action {
    rawData.getPokemon(name)
      .fold[Result](NotFound) { pokemon =>
      Ok(Json.obj(
        "name" -> pokemon.name,
        "id" -> pokemon.id,
        "types" -> pokemon.types,
        "stats" -> pokemon.stats
      ))
    }
      .withHeaders("Access-Control-Allow-Origin" -> "*")
  }

  def image(name: String) = Action.async {
    rawData.getPokemon(name)
      .flatMap(rawData.getImage)
      .fold[Future[Result]](Future(NotFound)) { image =>
      image.map(Ok(_))
    }
      .map(_.withHeaders("Access-Control-Allow-Origin" -> "*"))
  }

  def fetch = Action.async {
    rawData.storeRawData()
      .map(result => Ok(s"Fetched pokemons"))
  }
}
