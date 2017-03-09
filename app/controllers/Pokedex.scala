package controllers

import javax.inject.Inject

import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.ExecutionContext

class Pokedex @Inject() (rawData: PokemonRawDataService)(implicit context: ExecutionContext) extends Controller{
  def list(name: String) = Action.async {
    rawData.list
      .map(_.filter(_.name.contains(name)))
      .map(result => {
        Ok(Json.arr(result.map(pokemon => Json.obj("name" -> pokemon.name): Json.JsValueWrapper): _*))
          .withHeaders("Access-Control-Allow-Origin" -> "*")
      })
  }
}
