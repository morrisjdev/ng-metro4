import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import {SharedModule} from '../shared/shared.module';
import {HintComponent} from './hint/hint.component';
import {ToastComponent} from './toast/toast.component';
import {NotifyComponent} from './notify/notify.component';
import {DialogComponent} from './dialog/dialog.component';
import { DialogServiceComponent } from './dialog-service/dialog-service.component';
import { CustomDialogContentExampleComponent } from './dialog-service/custom-dialog-content-example/custom-dialog-content-example.component';

@NgModule({
  declarations: [
    HintComponent,
    ToastComponent,
    NotifyComponent,
    DialogComponent,
    DialogServiceComponent,
    CustomDialogContentExampleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InformationRoutingModule
  ]
})
export class InformationModule { }
