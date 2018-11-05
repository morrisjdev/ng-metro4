import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { TagInputComponent } from './form/tag-input/tag-input.component';
import { SelectComponent } from './form/select/select.component';
import { InputComponent } from './form/input/input.component';
import { MaterialInputComponent } from './form/material-input/material-input.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';

const declarations = [
  TagInputComponent,
  SelectComponent,
  InputComponent,
  MaterialInputComponent,
  TextareaComponent,
  CheckboxComponent
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
