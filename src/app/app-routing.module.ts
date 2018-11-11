import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagInputComponent} from './form/tag-input/tag-input.component';
import {SelectComponent} from './form/select/select.component';
import {InputComponent} from './form/input/input.component';
import {ReactiveComponent} from './reactive/reactive.component';
import {TextareaComponent} from './form/textarea/textarea.component';
import {CheckboxComponent} from './form/checkbox/checkbox.component';
import {RadioComponent} from './form/radio/radio.component';
import {FileInputComponent} from './form/file-input/file-input.component';
import {KeypadComponent} from './form/keypad/keypad.component';
import {SliderComponent} from './form/slider/slider.component';
import {SpinnerComponent} from './form/spinner/spinner.component';
import {RatingComponent} from './form/rating/rating.component';

const routes: Routes = [
  { path: 'reactive', component: ReactiveComponent },
  { path: 'form/tag-input', component: TagInputComponent },
  { path: 'form/select', component: SelectComponent },
  { path: 'form/input', component: InputComponent },
  { path: 'form/textarea', component: TextareaComponent },
  { path: 'form/checkbox', component: CheckboxComponent },
  { path: 'form/radio', component: RadioComponent },
  { path: 'form/file-input', component: FileInputComponent },
  { path: 'form/keypad', component: KeypadComponent },
  { path: 'form/slider', component: SliderComponent },
  { path: 'form/spinner', component: SpinnerComponent },
  { path: 'form/rating', component: RatingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
