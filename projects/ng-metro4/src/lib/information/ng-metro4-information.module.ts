import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintDirective } from './hint/hint.directive';

const declarations = [
  HintDirective
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations
  ]
})
export class NgMetro4InformationModule { }
