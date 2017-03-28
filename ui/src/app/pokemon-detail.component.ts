import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';

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
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
        for (let type of pokemon.types) {
          this.pokemonService.statsOfTypes(type)
            .then(stats => this.statsOfType[type] = stats);
        }
      });
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pokemonService: PokemonService) {
  }

  get imageLink(): string {
    return PokemonService.imageLink(this.pokemon)
  }

  onTypeClick(type: string) {
    this.selectedType = type;
  }

  pokemon: Pokemon;
  selectedType: string;
  statsOfType: {
    [key: string
      ]: {
      [key: string
        ]: number
    }
  } = {};
}
