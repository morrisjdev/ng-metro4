import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TagInputComponent } from './form/tag-input/tag-input.component';
import { SelectComponent } from './form/select/select.component';
import { InputComponent } from './form/input/input.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { RadioComponent } from './form/radio/radio.component';
import { FileInputComponent } from './form/file-input/file-input.component';
import { KeypadComponent } from './form/keypad/keypad.component';
import { SliderComponent } from './form/slider/slider.component';
import { SpinnerComponent } from './form/spinner/spinner.component';
import { RatingComponent } from './form/rating/rating.component';
import { DateTimeComponent } from './form/date-time/date-time.component';
import { ContainerComponent } from './base/container/container.component';
import {NgMetro4BaseModule, NgMetro4FormsModule} from 'ng-metro4';
import { GridComponent } from './base/grid/grid.component';
import { FormComponent } from './base/form/form.component';
import { ButtonComponent } from './base/button/button.component';
import { IconComponent } from './base/icon/icon.component';

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
    FileInputComponent,
    KeypadComponent,
    SliderComponent,
    SpinnerComponent,
    RatingComponent,
    DateTimeComponent,
    ContainerComponent,
    GridComponent,
    FormComponent,
    ButtonComponent,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgMetro4BaseModule,
    NgMetro4FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
