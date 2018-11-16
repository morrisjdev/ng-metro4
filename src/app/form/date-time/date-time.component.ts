import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.less']
})
export class DateTimeComponent implements OnInit {

  model = new Date('12.11.2018');

  constructor() { }

  ngOnInit() {
  }

}
