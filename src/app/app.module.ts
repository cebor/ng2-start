import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';

export function highchartsModulesFactory() {
  // apply Highcharts Modules to this array
  return [ exporting ];
}

@NgModule({
  imports: [
    BrowserModule,
    ChartModule,
    routing
  ],
  declarations: [
    AboutComponent,
    AppComponent,
    ChartComponent,
    HomeComponent,
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModulesFactory }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
