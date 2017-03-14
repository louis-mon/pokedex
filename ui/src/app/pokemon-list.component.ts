import { Component, OnInit} from '@angular/core';
import {PokemonService} from './pokemon.service';

@Component({
  selector: 'my-pokemon-list',
  template: `
  Search <input [(ngModel)]="search" (keyup)="onSearch()">
  <ul>
    <li *ngFor="let pokemon of pokemons">
      <a [routerLink]="['/pokemon', pokemon]">{{pokemon}}</a>
    </li>
  </ul>
  `,
})
export class PokemonListComponent extends OnInit {
  constructor(private pokemonService: PokemonService) { }
  ngOnInit(): void {
    this.searchFor('');
  }
  onSearch(): void {
    this.searchFor(this.search);
  }
  searchFor(name: string): void {
    this.pokemonService.getPokemons(name)
      .then((pokemons) => this.pokemons = pokemons);
  }
  search: '';
  pokemons: String[];
}
