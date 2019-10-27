import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMetro4FormsModule} from './form/ng-metro4-forms.module';
import {NgMetro4BaseModule} from './base/ng-metro4-base.module';
import {NgMetro4ControlsModule} from './controls/ng-metro4-controls.module';
import {NgMetro4InformationModule} from './information/ng-metro4-information.module';
import 'ng-metro4-lib';
import { AppComponent } from './helper/app/app.component';

const imports = [
  NgMetro4BaseModule,
  NgMetro4FormsModule,
  NgMetro4ControlsModule,
  NgMetro4InformationModule
];

@NgModule({
  imports: [
    CommonModule,
    ...imports
  ],
  declarations: [
  AppComponent
  ],
  exports: [
    ...imports,
    AppComponent
  ],
  providers: [

  ]
})
export class NgMetro4Module {
}
