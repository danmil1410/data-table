# DataTable

Simple Angular app for fetching nad displaying data in a table format. App supports filtering and paginating.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Before start

You `must` run `npm install` to install all libraries!!

## Project main structure
```
project
|   app -> main app files (components, modules, ...)
|   common -> common services, models and another
|   assets -> config file and media files (fonts, ...)
```
## How it works

Data is fetched from the api given in the conifg file (assets/config/config.json). Config file contains various informations about api (name, version, path) and default pagination options such as initalPage (page to be displayed), pageSize (amount of records per page) and paginationButtonsCount (amount of pagination page buttons to be displayed).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
