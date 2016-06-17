import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app',
  directives: [ ROUTER_DIRECTIVES ],
  styleUrls: ['app.less'],
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {
  ngOnInit() {
      console.log('App loaded!!');
  }
}
