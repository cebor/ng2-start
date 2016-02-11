///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {App} from './app/app';

declare var MODE: string;
if('prod' === MODE) {
  enableProdMode();
}

bootstrap(App, [
  ROUTER_PROVIDERS
]);
