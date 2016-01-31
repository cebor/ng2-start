import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './home/home';
import {About} from './about/about';

@Component({
    selector: 'app',
    directives: [ ROUTER_DIRECTIVES ],
    styles: [ require('./app.less') ],
    template: require('./app.html')
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
