# miswired-glitchy-vue-app

## Project Overview

This web app is an alternate way to interface with the [Glitchy Circuit Breaker Gadget](https://github.com/miswired/glitchy).

after running the install & build commands, the contents of the _dist_ folder should be loaded to the root directory of a MicroSD card and inserted into the card slot of the Glitchy board. Then follow the normal connection instructions defined in the [Glitchy Wiki](https://github.com/miswired/glitchy/wiki/Guide-%E2%80%90-Quick-Start).

## Release Notes

### 0.1.2 - BETA

#### Bug Fixes

- fixed an issue where the first key array was being sent to all 3 graph outputs.

---

### 0.1.1 - BETA

#### New Features

- added 'running...' notice to the key trace analysis while querying the server for data

#### Bug Fixes

- added unknown URL handling to redirect to home page instead of 404 error
- updated the analysis setup page so the label for attempts-per-length is now more clear about what that value is for
- fixed an issue where the glich attack page would not load form values when navigating away and then back to that page
- Scaled the key trace values to show volts instead of millivolts on the Y axis

---

### 0.1.0 - BETA

#### New Features

- Updated API connection with new command formatting
- Updated all stores to support new data styling
- Updated all components to display data appropriately
- Ready for full testing

---

### 0.0.6 - Alpha

#### New Features

- updated ADC and power analysis pages with ApexChart graphs instead of placeholders

#### Bug Fixes

- none

#### Backlog

- implement Glitch attack activity
- Update hardware API with updates from the Glitchy repo

---

### 0.0.5 - Alpha

#### New Features

- added ApexChart libraries for visualizations
- Implemented visualization output for the ADC view (amp and bias output)

#### Bug Fixes

- none

#### Backlog

- implement visualization for Power Analysis Attack
- implement Glitch attack activity

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
