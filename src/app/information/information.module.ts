import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import {SharedModule} from '../shared/shared.module';
import {HintComponent} from './hint/hint.component';
import {ToastComponent} from './toast/toast.component';
import {NotifyComponent} from './notify/notify.component';
import {DialogComponent} from './dialog/dialog.component';

@NgModule({
  declarations: [
    HintComponent,
    ToastComponent,
    NotifyComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InformationRoutingModule
  ]
})
export class InformationModule { }
