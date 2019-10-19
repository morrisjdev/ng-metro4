import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {EasingType} from '../../helper/types';

export interface NotifySetupOptions {
  container?: string;
  width?: string;
  timeout?: number;
  duration?: number;
  distance?: string;
  animation?: EasingType;
}

export interface NotifyOptions {
  keepOpen?: boolean;
  cls?: string;
  width?: string;
}

@Injectable()
export class NotifyService {

  constructor() { }

  public setup(options: NotifySetupOptions) {
    (<any>window).Metro.notify.setup(options);
  }

  public reset() {
    (<any>window).Metro.notify.reset();
  }

  public create(message: string, title?: string, options?: NotifyOptions): Observable<void> {
    const closeSubject$ = new Subject<any>();

    (<any>window).Metro.notify.create(message, title, {
      onClose: () => {
        closeSubject$.next();
        closeSubject$.complete();
      },
      ...options
    });

    return closeSubject$.asObservable();
  }
}
