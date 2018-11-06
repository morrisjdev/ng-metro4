import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgMetro4Module} from 'ng-metro4';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TagInputComponent } from './form/tag-input/tag-input.component';
import { SelectComponent } from './form/select/select.component';
import { InputComponent } from './form/input/input.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { RadioComponent } from './form/radio/radio.component';

@NgModule({
  declarations: [
    AppComponent,
    TagInputComponent,
    SelectComponent,
    InputComponent,
    ReactiveComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgMetro4Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
