package controllers

import play.api.libs.json._
import play.api.mvc._

class Pokedex extends Controller{
  def list(from: Int, to: Int, name: String) = Action {
    Ok(Json.arr(
      Json.obj("name" -> "a", "id" -> 1),
      Json.obj("name" -> "b", "id" -> 2)
    ))
      .withHeaders("Access-Control-Allow-Origin" -> "*")
  }
}
