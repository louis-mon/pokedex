import { Component } from '@angular/core';

import {PokemonService} from './pokemon.service';

@Component({
  selector: 'my-app',
  template: `
  <h1>Pokedex</h1>
  <router-outlet></router-outlet>
  `,
  providers: [PokemonService],
})
export class AppComponent{};
