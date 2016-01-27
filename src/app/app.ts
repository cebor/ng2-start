import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    styles: [ require('./app.less') ],
    template: '<span class="royalblue">Hello World!</span>'
})
export class App {
    ngOnInit() {
        console.log('App loaded!!');
    }
}
