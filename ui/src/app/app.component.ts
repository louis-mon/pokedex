import { Component } from '@angular/core';

export class Pokemon {
  name: String;
}

@Component({
  selector: 'my-app',
  template: `
  <input [(ngModel)]="search">
  Search: {{search}}
  <h1>Hello {{pokemon.name}}</h1>`,
})
export class AppComponent  { search: ''; pokemon: Pokemon = {name: 'pikachu'}; }
