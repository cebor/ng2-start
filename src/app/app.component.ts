import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';

@Component({
  selector: 'app',
  directives: [ ROUTER_DIRECTIVES ],
  styles: [ require('./app.less') ],
  template: require('./app.html')
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
