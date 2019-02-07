import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GravatarComponent} from './gravatar/gravatar.component';
import {DonutComponent} from './donut/donut.component';
import {ProgressComponent} from './progress/progress.component';
import {ActivityComponent} from './activity/activity.component';
import {PopoverDirective} from './popover/popover.directive';
import { PanelComponent } from './panel/panel.component';

const declarations = [
  GravatarComponent,
  DonutComponent,
  ProgressComponent,
  ActivityComponent,
  PopoverDirective,
  PanelComponent,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...declarations,
  ],
  exports: [
    ...declarations,
  ]
})
export class NgMetro4ControlsModule {
}
