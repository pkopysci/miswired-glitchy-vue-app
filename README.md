# miswired-glitchy-vue-app

## Project Overview
This web app is an alternate way to interface with the [Glitchy Circuit Breaker Gadget](https://github.com/miswired/glitchy).

after running the install & build commands, the contents of the *dist* folder should be loaded to the root directory of a MicroSD card and inserted into the card slot of the Glitchy board. Then follow the normal connection instructions defined in the [Glitchy Wiki](https://github.com/miswired/glitchy/wiki/Guide-%E2%80%90-Quick-Start).

## Release Notes
### 0.0.1 - Alpha
#### New Features
* initial project creation
* added websocket and Pinia stores

#### Bug Fixes
* none

#### Backlog
* error handling for failed websocket connections
* Add stores for specific Glitchy board features
* Add visualization libraries & create UI visualizations

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
