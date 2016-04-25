import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app/app.component';

declare var MODE: string;
if ('prod' === MODE) {
  enableProdMode();
}

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);
