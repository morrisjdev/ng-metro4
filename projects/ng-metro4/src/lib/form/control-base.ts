import {ControlValueAccessor} from '@angular/forms';

export abstract class ControlBase<T> implements ControlValueAccessor {
  public innerValue: T;

  public touchCallback: () => void = () => {};
  public changeCallback: (currentValue: T) => void = (_) => {};

  public changeValue(newValue: T, callback: boolean = true) {
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

  writeValue(newValue: T): void {
    this.innerValue = newValue;
    this.newValue();
  }
}
