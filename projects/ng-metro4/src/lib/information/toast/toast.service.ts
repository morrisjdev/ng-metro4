import { Injectable } from '@angular/core';
import {AccentType} from '../../helper/types';

interface ToastOptions {
  timeout?: number;
  cls?: string|AccentType;
  callback?: () => void;
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

  public create(message: string, options: ToastOptions = {}) {
    (<any>window).Metro.toast.create(message, options.callback, options.timeout, options.cls, options.additional);
  }
}
