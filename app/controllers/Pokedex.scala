package controllers

import javax.inject.Inject

import play.api.libs.json._
import play.api.mvc._
import services.PokemonRawDataService

import scala.concurrent.ExecutionContext

class Pokedex @Inject()(rawData: PokemonRawDataService)(implicit context: ExecutionContext) extends Controller {
  def list(name: String) = Action {
    val res = rawData.get
      .filter(_.name.contains(name))
    Ok(JsArray(res.map(pokemon => JsObject(Map("name" -> JsString(pokemon.name))))))
      .withHeaders("Access-Control-Allow-Origin" -> "*")
  }

  def fetch = Action.async {
    rawData.storeRawData()
      .map(result => Ok(s"Fetched pokemons"))
  }
}
