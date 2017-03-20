package model

case class Pokemon(name: String,
                   id: Int,
                   types: Seq[String],
                   stats: Map[String, Int],
                   imageLink: Option[String])
