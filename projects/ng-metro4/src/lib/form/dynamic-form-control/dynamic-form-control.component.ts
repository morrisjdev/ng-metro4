import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {M4FormControl} from '../m4-form-control';
import {ControlContainer, ControlValueAccessor} from '@angular/forms';
import {filter, startWith, take} from 'rxjs/operators';
import {asapScheduler, BehaviorSubject, Subscription} from 'rxjs';
import {InputComponent} from '../input/input.component';
import {CalendarComponent} from '../calendar/calendar.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {CheckboxGroupComponent} from '../checkbox-group/checkbox-group.component';
import {DatePickerComponent} from '../date-picker/date-picker.component';
import {FileInputComponent} from '../file-input/file-input.component';
import {KeypadComponent} from '../keypad/keypad.component';
import {MaterialInputComponent} from '../material-input/material-input.component';
import {RadioComponent} from '../radio/radio.component';
import {RadioGroupComponent} from '../radio-group/radio-group.component';
import {RatingComponent} from '../rating/rating.component';
import {SelectComponent} from '../select/select.component';
import {SliderComponent} from '../slider/slider.component';
import {SpinnerComponent} from '../spinner/spinner.component';
import {SwitchComponent} from '../switch/switch.component';
import {TagInputComponent} from '../tag-input/tag-input.component';
import {TextareaComponent} from '../textarea/textarea.component';
import {TimePickerComponent} from '../time-picker/time-picker.component';
import {FormControlType} from '../../helper/types';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';

export const formControlMapping: Record<FormControlType, any> = {
  'input': InputComponent,
  'calendar': CalendarComponent,
  'checkbox': CheckboxComponent,
  'checkbox-group': CheckboxGroupComponent,
  'date-picker': DatePickerComponent,
  'file-input': FileInputComponent,
  'keypad': KeypadComponent,
  'material-input': MaterialInputComponent,
  'radio': RadioComponent,
  'radio-group': RadioGroupComponent,
  'rating': RatingComponent,
  'select': SelectComponent,
  'slider': SliderComponent,
  'spinner': SpinnerComponent,
  'switch': SwitchComponent,
  'tag-input': TagInputComponent,
  'textarea': TextareaComponent,
  'time-picker': TimePickerComponent,
};

@Component({
  selector: 'm4-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.css'],
  providers: [DefaultValueAccessor.get(DynamicFormControlComponent), TypeAlias.get(DynamicFormControlComponent)],
})
export class DynamicFormControlComponent implements AfterContentInit, OnDestroy, OnChanges, ControlValueAccessor {
  @Input() formControl: M4FormControl;

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

    const factory = this.componentFactoryResolver.resolveComponentFactory<ControlBase<any>>(formControlMapping[this.formControl.controlType]);
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
