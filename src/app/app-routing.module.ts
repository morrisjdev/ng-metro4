import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagInputComponent} from './form/tag-input/tag-input.component';
import {SelectComponent} from './form/select/select.component';
import {InputComponent} from './form/input/input.component';

const routes: Routes = [
  { path: 'form/tag-input', component: TagInputComponent },
  { path: 'form/select', component: SelectComponent },
  { path: 'form/input', component: InputComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
