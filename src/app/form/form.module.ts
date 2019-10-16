import {NgModule} from '@angular/core';

import {FormRoutingModule} from './form-routing.module';
import {CalendarComponent} from './calendar/calendar.component';
import {TagInputComponent} from './tag-input/tag-input.component';
import {SelectComponent} from './select/select.component';
import {InputComponent} from './input/input.component';
import {TextareaComponent} from './textarea/textarea.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {RadioComponent} from './radio/radio.component';
import {FileInputComponent} from './file-input/file-input.component';
import {KeypadComponent} from './keypad/keypad.component';
import {SliderComponent} from './slider/slider.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {RatingComponent} from './rating/rating.component';
import {FormComponent} from './form/form.component';
import {MaterialInputComponent} from './material-input/material-input.component';
import {SwitchComponent} from './switch/switch.component';
import {CalendarPickerComponent} from './calendar-picker/calendar-picker.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {TimePickerComponent} from './time-picker/time-picker.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    TagInputComponent,
    SelectComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
    FileInputComponent,
    KeypadComponent,
    SliderComponent,
    SpinnerComponent,
    RatingComponent,
    FormComponent,
    MaterialInputComponent,
    SwitchComponent,
    CalendarPickerComponent,
    CalendarComponent,
    DatePickerComponent,
    TimePickerComponent,
  ],
  imports: [
    SharedModule,
    FormRoutingModule
  ]
})
export class FormModule { }
