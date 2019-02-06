import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.less']
})
export class DonutComponent implements OnInit {

  value = 10;
  hole = 10;

  constructor() { }

  ngOnInit() {
  }

}
