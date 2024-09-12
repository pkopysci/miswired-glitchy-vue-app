# miswired-glitchy-vue-app

## Project Overview
This web app is an alternate way to interface with the [Glitchy Circuit Breaker Gadget](https://github.com/miswired/glitchy).

after running the install & build commands, the contents of the *dist* folder should be loaded to the root directory of a MicroSD card and inserted into the card slot of the Glitchy board. Then follow the normal connection instructions defined in the [Glitchy Wiki](https://github.com/miswired/glitchy/wiki/Guide-%E2%80%90-Quick-Start).

## Release Notes
### 0.1.0 - BETA
#### New Features
* Updated API connection with new command formatting
* Updated all stores to support new data styling
* Updated all components to display data appropriately
* Ready for full testing

### 0.0.6 - Alpha
#### New Features
* updated ADC and power analysis pages with ApexChart graphs instead of placeholders

#### Bug Fixes
* none

#### Backlog
* implement Glitch attack activity
* Update hardware API with updates from the Glitchy repo
  
-----
### 0.0.5 - Alpha
#### New Features
* added ApexChart libraries for visualizations
* Implemented visualization output for the ADC view (amp and bias output)

#### Bug Fixes
* none

#### Backlog
* implement visualization for Power Analysis Attack
* implement Glitch attack activity

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
