import {Component, Input, OnInit} from '@angular/core';
import {FormStyle, M4FormGroup} from '../m4-form-group';
import {M4FormControl} from '../m4-form-control';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'm4-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  @Input() formGroup: M4FormGroup;

  formStyle: FormStyle;
  dynamicControls: M4FormControl[];

  constructor() { }

  ngOnInit() {
    this.formStyle = this.formGroup.formStyle;

    this.dynamicControls = Object.keys(this.formGroup.controls)
      .map((key: string, index: number) => {
        const control: AbstractControl = this.formGroup.controls[key];

        if (control instanceof M4FormControl) {
          control.fieldName = key;
          control.index = index;
          return control;
        }
      })
      .filter((control: M4FormControl) => !!control);
  }

}
