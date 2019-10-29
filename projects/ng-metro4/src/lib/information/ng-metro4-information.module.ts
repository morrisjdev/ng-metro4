import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintDirective } from './hint/hint.directive';
import { DialogComponent } from './dialog/dialog.component';
import {DialogService} from './dialog/dialog.service';
import {NotifyService} from './notify/notify.service';
import {ToastService} from './toast/toast.service';
import 'metro4';

const declarations = [
  HintDirective,
  DialogComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...declarations,
  ],
  exports: [
    ...declarations
  ],
  providers: [
    DialogService,
    NotifyService,
    ToastService
  ]
})
export class NgMetro4InformationModule { }
