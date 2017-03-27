import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {PokemonService} from './pokemon.service';
import {Pokemon} from './pokemon';

const statsNames = [
  {name: 'hp', abbrev: 'HP'},
  {name: 'attack', abbrev: 'ATK'},
  {name: 'defense', abbrev: 'DEF'},
  {name: 'special-attack', abbrev: 'S-ATK'},
  {name: 'special-defense', abbrev: 'S-DEF'},
  {name: 'speed', abbrev: 'SPD'},
];

const chartRadius = 120;

function coordsFromAngleRadius(i: number, radius: number) {
  const angle = Math.PI * 2 / statsNames.length * i;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
}

function pointFromAngleRadius(i: number, radius: number) {
  return coordsFromAngleRadius(i, radius).join(',');
}

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

  points(stats: {[key: string]: number}): string {
    return statsNames
      .map((name, i) => {
        const radius = chartRadius * stats[name.name] / 255;
        return pointFromAngleRadius(i, radius);
      }).join(' ');
  }

  polygonBorder(scale: number) {
    return statsNames.map((name, i) =>
      pointFromAngleRadius(i, chartRadius * scale)
    ).join(' ');
  }

  allStats() {
    return statsNames
      .map((name, i) => {
        const [x, y] = coordsFromAngleRadius(i, chartRadius);
        return {
          name: name.abbrev,
          x,
          y,
          transform: `translate(${pointFromAngleRadius(i, chartRadius + 30)})`,
        }
      });
  }

  onTypeClick(type: string) {
    console.log(type);
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
