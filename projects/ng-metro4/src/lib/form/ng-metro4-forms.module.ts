import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import 'metro4';

import {TagInputComponent} from './tag-input/tag-input.component';
import {SelectComponent} from './select/select.component';
import {InputComponent} from './input/input.component';
import {MaterialInputComponent} from './material-input/material-input.component';
import {TextareaComponent} from './textarea/textarea.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {RadioComponent} from './radio/radio.component';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {SwitchComponent} from './switch/switch.component';
import {FileInputComponent} from './file-input/file-input.component';
import {KeypadComponent} from './keypad/keypad.component';
import {SliderComponent} from './slider/slider.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {RatingComponent} from './rating/rating.component';
import {CalendarPickerComponent} from './calendar-picker/calendar-picker.component';
import {CalendarComponent} from './calendar/calendar.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {TimePickerComponent} from './time-picker/time-picker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckboxGroupComponent} from './checkbox-group/checkbox-group.component';
import {IsArrayPipe} from './pipes/is-array.pipe';
import {FormControlWrapperComponent} from './form-control-wrapper/form-control-wrapper.component';
import {ErrorDisplayPipe} from './pipes/error-display.pipe';
import {FormWrapperComponent} from './form-wrapper/form-wrapper.component';
import {FormBuilderComponent} from './form-builder/form-builder.component';
import {DynamicFormControlComponent} from './dynamic-form-control/dynamic-form-control.component';
import {UnwrapObservableOrValuePipe} from './pipes/unwrap-observable-or-value.pipe';
import {ExecuteFunctionOncePipe} from './pipes/execute-function-once.pipe';
import {TrustHtmlPipe} from './pipes/trust-html.pipe';
import {ObjectKeysPipe} from './pipes/object-keys.pipe';
import { CreateHashPipe } from './pipes/create-hash.pipe';

const declarations = [
  TagInputComponent,
  SelectComponent,
  InputComponent,
  MaterialInputComponent,
  TextareaComponent,
  CheckboxComponent,
  CheckboxGroupComponent,
  RadioComponent,
  RadioGroupComponent,
  SwitchComponent,
  FileInputComponent,
  KeypadComponent,
  SliderComponent,
  SpinnerComponent,
  RatingComponent,
  CalendarPickerComponent,
  CalendarComponent,
  DatePickerComponent,
  TimePickerComponent,
  FormControlWrapperComponent,
  FormWrapperComponent,
  FormBuilderComponent,
  DynamicFormControlComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    IsArrayPipe,
    ErrorDisplayPipe,
    UnwrapObservableOrValuePipe,
    ExecuteFunctionOncePipe,
    TrustHtmlPipe,
    ObjectKeysPipe,
    ...declarations,
    CreateHashPipe,
  ],
  exports: [
    ...declarations,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ...declarations
  ]
})
export class NgMetro4FormsModule { }
