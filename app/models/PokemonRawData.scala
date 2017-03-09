package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class PokemonRawData(name: String, url: String) {
}

object PokemonRawData {
  implicit val locationReads: Reads[PokemonRawData] = (
    (JsPath \ "name").read[String] and
      (JsPath \ "url").read[String]
    )(PokemonRawData.apply _)
}
