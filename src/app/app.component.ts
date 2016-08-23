import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: ['./app.css'],
  templateUrl: './app.html'
})

export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('App loaded!!');
  }
}
