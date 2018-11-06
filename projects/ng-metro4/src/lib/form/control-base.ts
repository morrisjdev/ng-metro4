import {ControlValueAccessor} from '@angular/forms';
import {ArrayHelper} from '../helper/array-helper';
import {AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';

export abstract class ControlBase<T> implements ControlValueAccessor, AfterViewInit, OnChanges {
  public innerValue: T;
  private disableUpdate = false;

  public touchCallback: () => void = () => {};
  public changeCallback: (currentValue: T) => void = (_) => {};

  public changeValue(newValue: T, callback: boolean = true) {
    if (this.disableUpdate) {
      return;
    }

    if (newValue instanceof Array && this.innerValue instanceof Array) {
      if (ArrayHelper.sequenceEquals(this.innerValue, newValue)) {
        return;
      }
    } else {
      if (newValue === this.innerValue) {
        return;
      }
    }

    this.innerValue = newValue;

    if (callback) {
      this.changeCallback(this.innerValue);
    }
  }

  registerOnChange(fn: (v: T) => void): void {
    this.changeCallback = fn;
  }

  public touched() {
    this.touchCallback();
  }

  registerOnTouched(fn: () => void): void {
    this.touchCallback = fn;
  }

  public abstract disable(disabled: boolean);

  setDisabledState(isDisabled: boolean): void {
    this.disable(isDisabled);
  }

  public abstract newValue();

  callNewValue() {
    this.disableUpdate = true;
    this.newValue();
    this.disableUpdate = false;
  }

  writeValue(newValue: T): void {
    this.innerValue = newValue;
    this.callNewValue();
  }

  public abstract createControl();

  ngAfterViewInit() {
    this.createControl();
    this.callNewValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.createControl();
      this.callNewValue();
    }, 0);
  }
}
