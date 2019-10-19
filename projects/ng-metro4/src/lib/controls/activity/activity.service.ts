import { Injectable } from '@angular/core';
import {ActivityStyleType, ActivityType} from '../../helper/types';

interface ActivityOptions {
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

  public open(options: ActivityOptions): any {
    return (<any>window).Metro.activity.open(options);
  }

  public close(activity: any) {
    (<any>window).Metro.activity.close(activity);
  }
}
