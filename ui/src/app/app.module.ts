import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,
  RouterModule.forRoot([{
    path: 'pokemons',
    component: PokemonListComponent,
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailComponent,
  },
  {
    path: '',
    redirectTo: '/pokemons',
    pathMatch: 'full',
  }
]) ],
  declarations: [ AppComponent, PokemonDetailComponent, PokemonListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
