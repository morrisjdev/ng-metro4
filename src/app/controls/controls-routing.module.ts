import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GravatarComponent} from './gravatar/gravatar.component';
import {DonutComponent} from './donut/donut.component';
import {ProgressComponent} from './progress/progress.component';
import {PopoverComponent} from './popover/popover.component';
import {PanelComponent} from './panel/panel.component';
import {HotkeyComponent} from './hotkey/hotkey.component';


const routes: Routes = [
  { path: 'gravatar', component: GravatarComponent },
  { path: 'donut', component: DonutComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'popover', component: PopoverComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'hotkey', component: HotkeyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlsRoutingModule { }
