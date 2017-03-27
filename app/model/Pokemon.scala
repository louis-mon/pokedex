package model

import play.api.libs.json.JsValue

case class Pokemon(name: String,
                   id: Int,
                   types: Seq[String],
                   stats: Map[String, Int],
                   imageLink: Option[String])

object Pokemon {
  def fromJson(json: JsValue) = Pokemon(
    name = (json \ "name").as[String],
    id = (json \ "id").as[Int],
    stats = {
      val stats = json \ "stats"
      (stats \\ "name").map(_.as[String])
        .zip((stats \\ "base_stat").map(_.as[Int]))
        .toMap
    },
    types = (json \ "types" \\ "name").map(_.as[String]),
    imageLink = (json \ "sprites" \ "front_default").asOpt[String]
  )
}