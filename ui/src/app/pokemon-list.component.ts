import { Component, OnInit, ViewChild } from '@angular/core';
import {Pokemon} from './pokemon';
import {PokemonService} from './pokemon.service';

@Component({
  selector: 'my-pokemon-list',
  template: `
  Search <input [(ngModel)]="search">
  <ul>
    <li *ngFor="let pokemon of pokemons" (click)="selected=pokemon">
      <a [routerLink]="['/pokemon', pokemon.id]">{{pokemon.name}}</a>
    </li>
  </ul>
  `,
})
export class PokemonListComponent implements OnInit {
  constructor(private pokemonService: PokemonService) { }
  ngOnInit(): void {
    this.pokemonService.getPokemons()
    .then((pokemons) => this.pokemons = pokemons)
  }
  selected: Pokemon;
  search: '';
  pokemons: Pokemon[];
}
