import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {App} from './app/app';

declare var MODE: string;
if('prod' === MODE) {
  enableProdMode();
}

bootstrap(App);
