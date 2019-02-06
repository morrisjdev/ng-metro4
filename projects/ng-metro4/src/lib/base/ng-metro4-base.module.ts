import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './button/button.directive';
import { IconComponent } from './icon/icon.component';

const declarations = [
  ButtonDirective,
  IconComponent,
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
