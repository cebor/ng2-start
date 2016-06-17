import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: RouterConfig = [
  { path: '/', redirectTo: '/home', terminal: true },
  { path: '/home', component: HomeComponent },
  { path: '/about', component: AboutComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
