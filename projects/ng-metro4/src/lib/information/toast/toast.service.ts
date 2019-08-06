import { Injectable } from '@angular/core';
import {AccentType} from '../../helper/types';
import {Observable, Subject} from 'rxjs';

interface ToastOptions {
  timeout?: number;
  cls?: string|AccentType;
  additional?: {
    distance?: number;
    showTop?: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  public create(message: string, options: ToastOptions = {}): Observable<any> {
    const closeSubject$ = new Subject<any>();

    (<any>window).Metro.toast.create(message, () => {
      closeSubject$.next();
      closeSubject$.complete();
    }, options.timeout, options.cls, options.additional);

    return closeSubject$.asObservable();
  }
}
