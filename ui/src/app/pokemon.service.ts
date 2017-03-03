import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Pokemon} from './pokemon';
import {POKEMONS} from './mock-pokemons';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PokemonService {
  constructor(private http: Http) {}
  getPokemons(): Promise<Pokemon[]> {
    return this.http.get('http://localhost:9000/list/0/10/a')
    .toPromise()
    .then(response => response.json() as Pokemon[])
  }
  getPokemon(id: number) : Promise<Pokemon> {
    return this.getPokemons()
    .then(pokemons => pokemons.find(pokemon => pokemon.id === id));
  }
}
