package controllers

import javax.inject.Inject

import play.api.cache.CacheApi
import play.api.libs.json.Json
import play.api.mvc._
import services.PokemonRawDataService

class TypeStats @Inject()(cacheApi: CacheApi, rawData: PokemonRawDataService) extends Controller {
  def typeStats(pokemonType: String) = Action {
    val statsAverage = cacheApi.getOrElse[Map[String, Double]](s"types.$pokemonType") {
      rawData.getList
        .filter(_.types.contains(pokemonType))
        .flatMap(pokemon => pokemon.stats.toVector)
        .groupBy(_._1)
        .mapValues(_.map(_._2))
        .mapValues(stats => stats.sum.toDouble / stats.size)
    }
    Ok(Json.toJson(statsAverage))
  }
}
