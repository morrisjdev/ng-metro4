import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintDirective } from './hint/hint.directive';
import { DialogComponent } from './dialog/dialog.component';

const declarations = [
  HintDirective,
  DialogComponent
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
export class NgMetro4InformationModule { }
