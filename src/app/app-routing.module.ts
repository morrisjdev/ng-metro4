import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagInputComponent} from './form/tag-input/tag-input.component';
import {SelectComponent} from './form/select/select.component';
import {InputComponent} from './form/input/input.component';
import {ReactiveComponent} from './reactive/reactive.component';
import {TextareaComponent} from './form/textarea/textarea.component';
import {CheckboxComponent} from './form/checkbox/checkbox.component';
import {RadioComponent} from './form/radio/radio.component';

const routes: Routes = [
  { path: 'reactive', component: ReactiveComponent },
  { path: 'form/tag-input', component: TagInputComponent },
  { path: 'form/select', component: SelectComponent },
  { path: 'form/input', component: InputComponent },
  { path: 'form/textarea', component: TextareaComponent },
  { path: 'form/checkbox', component: CheckboxComponent },
  { path: 'form/radio', component: RadioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
