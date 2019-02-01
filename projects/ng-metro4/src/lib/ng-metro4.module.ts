import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { TagInputComponent } from './form/tag-input/tag-input.component';
import { SelectComponent } from './form/select/select.component';
import { InputComponent } from './form/input/input.component';
import { MaterialInputComponent } from './form/material-input/material-input.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { RadioComponent } from './form/radio/radio.component';
import { RadioGroupComponent } from './form/radio-group/radio-group.component';
import { SwitchComponent } from './form/switch/switch.component';
import { FileInputComponent } from './form/file-input/file-input.component';
import { KeypadComponent } from './form/keypad/keypad.component';
import { SliderComponent } from './form/slider/slider.component';
import { SpinnerComponent } from './form/spinner/spinner.component';
import { RatingComponent } from './form/rating/rating.component';
import { CalendarPickerComponent } from './form/calendar-picker/calendar-picker.component';
import { CalendarComponent } from './form/calendar/calendar.component';
import { DatePickerComponent } from './form/date-picker/date-picker.component';
import { TimePickerComponent } from './form/time-picker/time-picker.component';

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
    ...declarations,
    TimePickerComponent,
  ],
  exports: [
    ...declarations
  ]
})
export class NgMetro4Module {
}
