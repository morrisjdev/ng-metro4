import { Injectable } from '@angular/core';
import {AccentType} from '../../helper/types';
import {Observable, Subject} from 'rxjs';

export interface ToastOptions {
  timeout?: number;
  cls?: string|AccentType;
  additional?: {
    distance?: number;
    showTop?: boolean;
  };
}

@Injectable()
export class ToastService {

  constructor() { }

  /**
   * Create a toast message
   * @param message The message
   * @param options The options of the toast
   */
  public create(message: string, options: ToastOptions = {}): Observable<void> {
    const closeSubject$ = new Subject<void>();

    (<any>window).Metro.toast.create(message, () => {
      closeSubject$.next();
      closeSubject$.complete();
    }, options.timeout, options.cls, options.additional);

    return closeSubject$.asObservable();
  }
}
