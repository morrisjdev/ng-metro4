import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivityStyleType, ActivityType} from '../../helper/types';

declare var $: any;

@Component({
  selector: 'm4-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnChanges {
  @Input() type: ActivityType;
  @Input('activity-style') activityStyle: ActivityStyleType;

  @ViewChild('activity') private activity: ElementRef;
  private clonedElement: any;

  constructor() { }

  private createControl() {
    setTimeout(() => {
      const originalElement = $(this.activity.nativeElement);
      originalElement.hide();

      if (this.clonedElement) {
        this.clonedElement.remove();
      }

      this.clonedElement = originalElement.clone().show();
      originalElement.parent().append(this.clonedElement);

      this.clonedElement.activity();
    }, 0);
  }

  ngOnInit() {
    this.createControl();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.createControl();
  }

}
