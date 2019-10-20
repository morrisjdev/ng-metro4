import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HintComponent} from './hint/hint.component';
import {ToastComponent} from './toast/toast.component';
import {NotifyComponent} from './notify/notify.component';
import {DialogComponent} from './dialog/dialog.component';
import {DialogServiceComponent} from './dialog-service/dialog-service.component';

const routes: Routes = [
  { path: 'hint', component: HintComponent },
  { path: 'toast', component: ToastComponent },
  { path: 'notify', component: NotifyComponent },
  { path: 'dialog', component: DialogComponent },
  { path: 'dialog-service', component: DialogServiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
