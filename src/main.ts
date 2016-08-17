import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if ('prod' === ENV) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
