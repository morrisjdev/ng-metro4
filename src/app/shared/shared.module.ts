import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocComponentComponent} from './doc-component/doc-component.component';
import {NgMetro4Module} from 'ng-metro4';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HighlightModule} from 'ngx-highlightjs';

@NgModule({
  declarations: [
    DocComponentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightModule,
    NgMetro4Module
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightModule,
    NgMetro4Module,
    DocComponentComponent,
  ]
})
export class SharedModule { }
