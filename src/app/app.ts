import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from "./home/home";
import {About} from "./about/about";

@Component({
    selector: 'app',
    directives: [ ROUTER_DIRECTIVES ],
    styles: [ require('./app.less') ],
    template: `
      <h1 class="royalblue">ng2-start</h1>
      <br>
      <a [routerLink]=" ['Home'] ">Home</a>
      <a [routerLink]=" ['About'] ">About</a>
      <br>
      <router-outlet></router-outlet>
    `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App {
    ngOnInit() {
        console.log('App loaded!!');
    }
}
