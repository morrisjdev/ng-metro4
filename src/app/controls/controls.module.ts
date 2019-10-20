import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ControlsRoutingModule} from './controls-routing.module';
import {SharedModule} from '../shared/shared.module';
import {GravatarComponent} from './gravatar/gravatar.component';
import {DonutComponent} from './donut/donut.component';
import {ProgressComponent} from './progress/progress.component';
import {PopoverComponent} from './popover/popover.component';
import {PanelComponent} from './panel/panel.component';
import {HotkeyComponent} from './hotkey/hotkey.component';
import {ActivityComponent} from './activity/activity.component';
import {ActivityServiceComponent} from './activity-service/activity-service.component';


@NgModule({
  declarations: [
    GravatarComponent,
    DonutComponent,
    ProgressComponent,
    PopoverComponent,
    PanelComponent,
    HotkeyComponent,
    ActivityComponent,
    ActivityServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ControlsRoutingModule
  ]
})
export class ControlsModule {
}
