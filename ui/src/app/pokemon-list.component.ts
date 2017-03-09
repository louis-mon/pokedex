import { Component, OnInit} from '@angular/core';
import {Pokemon} from './pokemon';
import {PokemonService} from './pokemon.service';

@Component({
  selector: 'my-pokemon-list',
  template: `
  Search <input [(ngModel)]="search" (keyup)="onSearch()">
  <ul>
    <li *ngFor="let pokemon of pokemons">
      <a [routerLink]="['/pokemon', pokemon.name]">{{pokemon.name}}</a>
    </li>
  </ul>
  `,
})
export class PokemonListComponent {
  constructor(private pokemonService: PokemonService) { }
  onSearch(): void {
    this.pokemonService.getPokemons(this.search)
      .then((pokemons) => this.pokemons = pokemons)
  }
  search: '';
  pokemons: Pokemon[];
}
