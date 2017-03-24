# Pokedex application

## Prerequisites

* sbt version >= 0.13.11
* npm version >= 3.10.10
* node version >= v6.10.0

## Run the server

Go to project root, then
`$sbt run`

If you change the server port, the port needs to be changed as well in the variable baseUrl in `ui/src/app/pokemon.service.ts`.

### Generate database

Before launching the webapp we first need to fetch the pokemon data.

Go to http://localhost:9000/fetch

This may take a while, all pokemons are downloaded (about 30 min).

## Run the webapp

```
cd ui
npm install
npm start
```

The app should launch in the browser.
