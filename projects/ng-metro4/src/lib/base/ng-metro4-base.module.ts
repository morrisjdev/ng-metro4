import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './button/button.directive';
import { IconDirective } from './icon/icon.directive';

const declarations = [
  ButtonDirective,
  IconDirective,
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
