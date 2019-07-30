import {ControlValueAccessor} from '@angular/forms';
import {AfterViewInit, ElementRef, Input, OnChanges, OnDestroy, Optional, SimpleChanges} from '@angular/core';
import {ObjectHelper} from '../helper/object-helper';
import {asapScheduler, Observable} from 'rxjs';

export abstract class ControlBase<T> implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
  private classObserver: MutationObserver;

  public innerValue: T;
  public disableUpdate = false;

  public touchCallback: () => void = () => {};
  public changeCallback: (currentValue: T) => void = (_) => {};

  constructor(@Optional() private mainElement: ElementRef) {}

  private observeClassValue() {
    const filterOut: string[] = ['ng-valid', 'ng-dirty', 'ng-touched', 'ng-untouched', 'ng-pristine', 'ng-invalid'];
    let previousClassValue: string[] = [];
    const classValueCallback = () => {
      const classValue: string = this.mainElement.nativeElement.getAttribute('class') || '';
      const classValueArray: string[] = classValue.split(' ').filter(v => !!v && filterOut.indexOf(v) === -1);
      this.newClassValue(classValueArray, previousClassValue);
      previousClassValue = classValueArray;
    };
    this.classObserver = new MutationObserver(classValueCallback);

    this.classObserver.observe(this.mainElement.nativeElement, {
      attributeFilter: ['class'],
      attributes: true
    });

    classValueCallback();
  }

  public abstract newClassValue(newClasses: string[], oldClasses: string[]);

  public changeValue(newValue: T, callback: boolean = true) {
    if (this.disableUpdate) {
      return;
    }

    if (ObjectHelper.compare(newValue, this.innerValue)) {
      return;
    }

    this.innerValue = newValue;

    if (callback) {
      this.changeCallback(this.innerValue);
    }
  }

  registerOnChange(fn: (v: T) => void): void {
    this.changeCallback = fn;
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

  public abstract createControl(): Promise<void>;

  ngAfterViewInit() {
    this.createControl().then(() => {
      this.callNewValue();
      this.observeClassValue();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    asapScheduler.schedule(() => {
      this.createControl().then(() => {
        this.callNewValue();
      });
    });
  }

  ngOnDestroy(): void {
    this.classObserver.disconnect();
  }
}
