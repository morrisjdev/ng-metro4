import { Injectable } from '@angular/core';
import {ActivityStyleType, ActivityType} from '../../helper/types';

export interface ActivityOptions {
  type?: ActivityType;
  style?: ActivityStyleType;
  autoHide?: number;
  overlayClickClose?: boolean;
  overlayColor?: string;
  overlayAlpha?: number;
  text?: string;
}

@Injectable()
export class ActivityService {

  constructor() { }

  /**
   * Open an activity
   * @param options The activity options
   */
  public open(options: ActivityOptions): any {
    return (<any>window).Metro.activity.open(options);
  }

  /**
   * Closes an opened activity
   * @param activity The activity object returned by open
   */
  public close(activity: any) {
    (<any>window).Metro.activity.close(activity);
  }
}
