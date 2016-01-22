import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    template: '<span>Hello World!</span>'
})
class App {
    constructor() {
        console.log('App loaded!!');
    }
}

bootstrap(App);
