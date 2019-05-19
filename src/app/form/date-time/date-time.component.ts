import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.less']
})
export class DateTimeComponent implements OnInit {


  exclude = [
    moment('17.11.2018', 'DD.MM.YYYY'),
    moment('16.11.2018', 'DD.MM.YYYY'),
    moment('15.11.2018', 'DD.MM.YYYY')
  ];

  min = moment('03.11.2018', 'DD.MM.YYYY');
  max = moment('28.11.2018', 'DD.MM.YYYY');

  model = moment('12.11.2018', 'DD.MM.YYYY');
  alert = true;

  dmodel = moment.duration('5:30:47');

  modelMulti = [moment('12.11.2018', 'DD.MM.YYYY'), moment('13.11.2018', 'DD.MM.YYYY')];

  constructor() { }

  ngOnInit() {
  }

}
