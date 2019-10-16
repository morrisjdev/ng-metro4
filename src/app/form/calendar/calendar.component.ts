import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

  today = moment();
  dateArray = [moment().add(-1, 'd'), moment().add(-2, 'd'), moment().add(-3, 'd'), moment().add(-4, 'd')];

  constructor() { }

  ngOnInit() {
  }

}
