import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GravatarComponent} from './gravatar/gravatar.component';
import {DonutComponent} from './donut/donut.component';
import {ProgressComponent} from './progress/progress.component';
import {ActivityComponent} from './activity/activity.component';

const declarations = [
  GravatarComponent,
  DonutComponent,
  ProgressComponent,
  ActivityComponent,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations,
  ]
})
export class NgMetro4ControlsModule {
}
