import { NgModule } from '@angular/core';
import { TagInputComponent } from './form/tag-input/tag-input.component';
import {FormsModule} from '@angular/forms';
import { SelectComponent } from './form/select/select.component';
import { InputComponent } from './form/input/input.component';
import {CommonModule} from '@angular/common';
import { MaterialInputComponent } from './form/material-input/material-input.component';
import { TextareaComponent } from './form/textarea/textarea.component';

const declarations = [
  TagInputComponent,
  SelectComponent,
  InputComponent,
  MaterialInputComponent,
  TextareaComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...declarations,
  ],
  exports: [
    ...declarations
  ]
})
export class NgMetro4Module { }
