import {Component} from '@angular/core';
import {ActivityService, ActivityType} from 'ng-metro4';

@Component({
  selector: 'app-activity-service',
  templateUrl: './activity-service.component.html',
  styleUrls: ['./activity-service.component.less']
})
export class ActivityServiceComponent {

  constructor(public activityService: ActivityService) { }

  showActivity(type: ActivityType) {
    this.activityService.open({
      style: 'color',
      text: 'Loading ...',
      type: type,
      autoHide: 2000
    });
  }

  showActivityOverlay(type: ActivityType) {
    this.activityService.open({
      style: 'color',
      text: 'Loading ...',
      type: type,
      autoHide: 2000,
      overlayAlpha: 0.1,
      overlayColor: '#ff0000',
      overlayClickClose: true
    });
  }
}
