import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Pokemon} from './pokemon';

import 'rxjs/add/operator/toPromise';

const baseUrl = 'http://localhost:9000/';

@Injectable()
export class PokemonService {
  constructor(private http: Http) {}
  getPokemons(name: string): Promise<String[]> {
    return this.http.get(`${baseUrl}list?name=${name}`)
    .toPromise()
    .then(response => response.json() as String[])
  }
  getPokemon(name: string) : Promise<Pokemon> {
    return this.http.get(`${baseUrl}pokemon/${name}`)
      .toPromise()
      .then(response => response.json() as Pokemon);
  }

  imageLink(pokemon: Pokemon): string {
    return `${baseUrl}image/${pokemon.name}`;
  }
}
