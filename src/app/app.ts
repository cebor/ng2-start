import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    template: '<span>Hello World!</span>'
})
export class App {
    ngOnInit() {
        console.log('App loaded!!');
    }
}
