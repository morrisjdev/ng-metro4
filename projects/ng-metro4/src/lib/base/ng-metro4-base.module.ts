import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './button/button.directive';
import { IconComponent } from './icon/icon.component';
import { RippleDirective } from './ripple/ripple.directive';
import { LoadingDirective } from './loading/loading.directive';
import { LoadingDisplayDirective } from './loading/loading-display.directive';
import { AnimationDirective } from './animation/animation.directive';
import { LetDirective } from './let/let.directive';
import 'ng-metro4-lib';

const declarations = [
  ButtonDirective,
  IconComponent,
  RippleDirective,
  LoadingDirective,
  LoadingDisplayDirective,
  AnimationDirective,
  LetDirective,
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
  ]
})
export class NgMetro4BaseModule { }
