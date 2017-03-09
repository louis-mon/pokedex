import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon';

@Component({
  selector: 'my-pokemon-detail',
  template: `
  <button (click)="location.back()">Back to list</button>
  <div *ngIf="pokemon">Selected: {{pokemon.name}}, id: {{pokemon.id}}</div>
  `
})
export class PokemonDetailComponent implements OnInit {
  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this.pokemonService.getPokemon(+params['id']))
    .subscribe((pokemon) => this.pokemon = pokemon);
  }
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pokemonService: PokemonService) {}
  pokemon: Pokemon
}
