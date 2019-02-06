import { Component, OnInit } from '@angular/core';
import {ActivityService} from 'ng-metro4';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.less']
})
export class ProgressComponent implements OnInit {

  small = false;
  value = 10;
  buffer = 20;

  style = '';
  type = 'cycle';

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
  }

  showActivity() {
    this.activityService.open({
      autoHide: 2000,
      overlayAlpha: 0.1,
      style: <any>this.style,
      type: <any>this.type
    });

  }
}
