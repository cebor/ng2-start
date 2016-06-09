import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@Component({
  moduleId: module.id,
  selector: 'app',
  directives: [ ROUTER_DIRECTIVES ],
  styleUrls: [ './app.less' ],
  templateUrl: './app.html'
})
@RouteConfig([
  { path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true },
  { path: '/about', component: AboutComponent, name: 'About' }
])
export class AppComponent implements OnInit {
  ngOnInit() {
      console.log('App loaded!!');
  }
}
