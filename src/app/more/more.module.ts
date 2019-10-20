import {NgModule} from '@angular/core';

import {MoreRoutingModule} from './more-routing.module';
import {SharedModule} from '../shared/shared.module';
import { GetControlsComponent } from './get-controls/get-controls.component';
import { ListsComponent } from './lists/lists.component';


@NgModule({
  declarations: [GetControlsComponent, ListsComponent],
  imports: [
    SharedModule,
    MoreRoutingModule
  ]
})
export class MoreModule { }
