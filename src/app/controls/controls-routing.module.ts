import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GravatarComponent} from './gravatar/gravatar.component';
import {DonutComponent} from './donut/donut.component';
import {ProgressComponent} from './progress/progress.component';
import {PopoverComponent} from './popover/popover.component';
import {PanelComponent} from './panel/panel.component';
import {HotkeyComponent} from './hotkey/hotkey.component';
import {ActivityComponent} from './activity/activity.component';
import {ActivityServiceComponent} from './activity-service/activity-service.component';
import {DraggableComponent} from './draggable/draggable.component';


const routes: Routes = [
  { path: 'gravatar', component: GravatarComponent },
  { path: 'donut', component: DonutComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'popover', component: PopoverComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'hotkey', component: HotkeyComponent },
  { path: 'draggable', component: DraggableComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'activity-service', component: ActivityServiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlsRoutingModule { }
