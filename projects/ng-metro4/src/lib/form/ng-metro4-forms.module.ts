import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagInputComponent } from './tag-input/tag-input.component';
import { SelectComponent } from './select/select.component';
import { InputComponent } from './input/input.component';
import { MaterialInputComponent } from './material-input/material-input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { SwitchComponent } from './switch/switch.component';
import { FileInputComponent } from './file-input/file-input.component';
import { KeypadComponent } from './keypad/keypad.component';
import { SliderComponent } from './slider/slider.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RatingComponent } from './rating/rating.component';
import { CalendarPickerComponent } from './calendar-picker/calendar-picker.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import {FormsModule} from '@angular/forms';

const declarations = [
  TagInputComponent,
  SelectComponent,
  InputComponent,
  MaterialInputComponent,
  TextareaComponent,
  CheckboxComponent,
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
  TimePickerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations
  ]
})
export class NgMetro4FormsModule { }
