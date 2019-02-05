import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMetro4FormsModule} from './form/ng-metro4-forms.module';
import {NgMetro4BaseModule} from './base/ng-metro4-base.module';

const declarations = [

];

@NgModule({
  imports: [
    CommonModule,
    NgMetro4BaseModule,
    NgMetro4FormsModule
  ],
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations,
    NgMetro4BaseModule,
    NgMetro4FormsModule
  ]
})
export class NgMetro4Module {
}
