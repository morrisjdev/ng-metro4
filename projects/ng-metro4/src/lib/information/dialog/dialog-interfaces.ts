import {EventEmitter} from '@angular/core';

export interface M4DialogDataEmitter<T> {
  dialogDataEmitter: EventEmitter<T>;
}

export interface M4DialogDataInput<T> {
  dialogDataInput: T;
}
