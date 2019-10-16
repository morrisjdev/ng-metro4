import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.less']
})
export class TimePickerComponent implements OnInit {

  duration = moment.duration('5:27:15');

  constructor() { }

  ngOnInit() {
  }

}
