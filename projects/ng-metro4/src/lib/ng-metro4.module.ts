import { NgModule } from '@angular/core';
import { TagInputComponent } from './form/tag-input/tag-input.component';
import {FormsModule} from '@angular/forms';
import { SelectComponent } from './form/select/select.component';

const declarations = [
  TagInputComponent,
  SelectComponent
];

@NgModule({
  imports: [
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
