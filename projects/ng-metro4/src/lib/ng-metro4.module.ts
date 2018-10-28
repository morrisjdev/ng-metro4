import { NgModule } from '@angular/core';
import { TagInputComponent } from './form/tag-input/tag-input.component';

const declarations = [
  TagInputComponent
];

@NgModule({
  imports: [
  ],
  declarations: [
    ...declarations
  ],
  exports: [
    ...declarations
  ]
})
export class NgMetro4Module { }
