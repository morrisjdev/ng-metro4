import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {M4FormControl} from '../m4-form-control';
import {ControlValueAccessor} from '@angular/forms';
import {filter, startWith, take} from 'rxjs/operators';
import {asapScheduler, BehaviorSubject, Subscription} from 'rxjs';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';

@Component({
  selector: 'm4-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.css'],
  providers: [DefaultValueAccessor.get(DynamicFormControlComponent), TypeAlias.get(DynamicFormControlComponent)],
})
export class DynamicFormControlComponent implements AfterContentInit, OnDestroy, OnChanges, ControlValueAccessor {
  @Input() formControl: M4FormControl<ControlBase<any>>;

  @ViewChild('container', {read: ViewContainerRef, static: true}) private container: ViewContainerRef;
  private componentRef: ComponentRef<ControlBase<any>>;
  private componentInstance: ControlBase<any>;

  private onChangeFunction: any;
  private onTouchedFunction: any;

  private statusChangeSubscription: Subscription;

  private componentReady$ = new BehaviorSubject<boolean>(false);

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterContentInit() {
    this.ngOnDestroy();

    const factory = this.componentFactoryResolver.resolveComponentFactory<ControlBase<any>>(this.formControl.controlType);
    this.componentRef = this.container.createComponent<ControlBase<any>>(factory);
    this.componentInstance = this.componentRef.instance;

    this.componentInstance.registerOnChange(this.onChangeFunction);
    this.componentInstance.registerOnTouched(this.onTouchedFunction);

    if (this.formControl.controlOptions) {
      Object.keys(this.formControl.controlOptions).forEach((key: any) => {
        this.componentInstance.updateProperty(key, this.formControl.controlOptions[key]);
      });
    }

    this.statusChangeSubscription = this.formControl.statusChanges.pipe(startWith(this.formControl.status))
      .subscribe((state) => {
        if (this.formControl.pristine) {
          return;
        }

        const validClasses = ['success'];
        const invalidClasses = ['alert'];

        const newClassValue = state === 'INVALID' ? invalidClasses : validClasses;
        const oldClassValue = state === 'INVALID' ? validClasses : invalidClasses;
        this.componentInstance.newClassValue(newClassValue, oldClassValue);
      });

    asapScheduler.schedule(() => {
      this.componentReady$.next(true);

      asapScheduler.schedule(() => {
        this.formControl.markAsPristine();
      });
    });
  }

  ngOnDestroy(): void {
    this.componentReady$.next(false);

    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
      this.componentInstance = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterContentInit();
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.componentReady$.pipe(filter(v => v), take(1)).subscribe(() => {
      this.componentInstance.setDisabledState(isDisabled);
    });
  }

  writeValue(obj: any): void {
    this.componentReady$.pipe(filter(v => v), take(1)).subscribe(() => {
      this.componentInstance.writeValue(obj);
    });
  }
}
