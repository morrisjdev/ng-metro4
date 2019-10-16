import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.less']
})
export class CalendarPickerComponent implements OnInit {

  today = moment();
  dateArray = [moment().add(-1, 'd'), moment().add(-2, 'd'), moment().add(-3, 'd'), moment().add(-4, 'd')];

  constructor() {
  }

  ngOnInit() {
  }

}
