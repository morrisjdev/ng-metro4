import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagInputComponent} from './tag-input/tag-input.component';
import {SelectComponent} from './select/select.component';
import {InputComponent} from './input/input.component';
import {MaterialInputComponent} from './material-input/material-input.component';
import {TextareaComponent} from './textarea/textarea.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {SwitchComponent} from './switch/switch.component';
import {RadioComponent} from './radio/radio.component';
import {FileInputComponent} from './file-input/file-input.component';
import {KeypadComponent} from './keypad/keypad.component';
import {SliderComponent} from './slider/slider.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {RatingComponent} from './rating/rating.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CalendarPickerComponent} from './calendar-picker/calendar-picker.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {TimePickerComponent} from './time-picker/time-picker.component';
import {FormComponent} from './form/form.component';
import {FormWrapperComponent} from './form-wrapper/form-wrapper.component';
import {FormControlWrapperComponent} from './form-control-wrapper/form-control-wrapper.component';
import {FormBuilderComponent} from './form-builder/form-builder.component';

const routes: Routes = [
  { path: 'tag-input', component: TagInputComponent },
  { path: 'select', component: SelectComponent },
  { path: 'input', component: InputComponent },
  { path: 'material_input', component: MaterialInputComponent },
  { path: 'textarea', component: TextareaComponent },
  { path: 'checkbox', component: CheckboxComponent },
  { path: 'switch', component: SwitchComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'file-input', component: FileInputComponent },
  { path: 'keypad', component: KeypadComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'spinner', component: SpinnerComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'calendar', component: CalendarComponent},
  { path: 'calender_picker', component: CalendarPickerComponent },
  { path: 'date_picker', component: DatePickerComponent },
  { path: 'time_picker', component: TimePickerComponent },
  { path: 'form', component: FormComponent },
  { path: 'form_wrapper', component: FormWrapperComponent },
  { path: 'form_control_wrapper', component: FormControlWrapperComponent },
  { path: 'form_builder', component: FormBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
