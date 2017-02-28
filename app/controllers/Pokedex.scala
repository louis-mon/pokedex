package controllers

import play.api.libs.json._
import play.api.mvc._

class Pokedex extends Controller{
  def list(from: Int, to: Int, name: String) = Action {
    Ok(Json.arr(
      Json.obj("name" -> "a"),
      Json.obj("name" -> "b")
    ))
  }
}
