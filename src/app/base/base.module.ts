import {NgModule} from '@angular/core';

import {BaseRoutingModule} from './base-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ContainerComponent} from './container/container.component';
import {GridComponent} from './grid/grid.component';
import {ButtonComponent} from './button/button.component';
import {IconComponent} from './icon/icon.component';
import {LoadingComponent} from './loading/loading.component';
import {LetComponent} from './let/let.component';
import {RippleComponent} from './ripple/ripple.component';
import { AnimationComponent } from './animation/animation.component';


@NgModule({
  declarations: [
    ContainerComponent,
    GridComponent,
    ButtonComponent,
    IconComponent,
    LoadingComponent,
    LetComponent,
    RippleComponent,
    AnimationComponent
  ],
  imports: [
    SharedModule,
    BaseRoutingModule
  ]
})
export class BaseModule { }
