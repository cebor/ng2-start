import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'about', component: AboutComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
