import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GetControlsComponent} from './get-controls/get-controls.component';
import {ListsComponent} from './lists/lists.component';


const routes: Routes = [
  { path: 'get-controls', component: GetControlsComponent },
  { path: 'lists', component: ListsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreRoutingModule { }
