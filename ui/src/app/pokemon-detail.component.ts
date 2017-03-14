import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {PokemonService} from './pokemon.service';
import {Pokemon} from './pokemon';

@Component({
  moduleId: module.id,
  selector: 'my-pokemon-detail',
  templateUrl: './pokemon-detail.component.html'
})
export class PokemonDetailComponent implements OnInit {
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.pokemonService.getPokemon(params['id']))
      .subscribe((pokemon) => this.pokemon = pokemon);
  }

  constructor(private route: ActivatedRoute,
              private location: Location,
              private pokemonService: PokemonService) {
  }

  get imageLink(): string {
    return this.pokemonService.imageLink(this.pokemon)
  }

  pokemon: Pokemon
}
