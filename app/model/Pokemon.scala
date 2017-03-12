package model

case class Pokemon(name: String,
                   types: Seq[String],
                   stats: Map[String, Int])
