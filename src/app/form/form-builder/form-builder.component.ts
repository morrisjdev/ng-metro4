import {Component, OnInit} from '@angular/core';
import {InputComponent, M4FormControl, M4FormGroup} from 'ng-metro4';
import {Validators} from '@angular/forms';
import {CustomGroupValidator} from '../form/custom-group-validator';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.less']
})
export class FormBuilderComponent implements OnInit {
  formGroup: M4FormGroup;
  formGroupValidation: M4FormGroup;
  formGroupStyle: M4FormGroup;

  constructor() {
    this.formGroup = new M4FormGroup('form_name', {
      name: new M4FormControl(InputComponent)
    });

    this.formGroupValidation = new M4FormGroup('form_name', {
      name: new M4FormControl(InputComponent, null, [ Validators.required ]),
      nameConfirm: new M4FormControl(InputComponent, null, [ Validators.required ]),
    }, [ CustomGroupValidator.sameValues('name', 'nameConfirm') ]);

    this.formGroupStyle = new M4FormGroup('form_name', {
      name: new M4FormControl(InputComponent, null, [ Validators.required ]),
      nameConfirm: new M4FormControl(InputComponent, null, [ Validators.required ]),
    }, [ CustomGroupValidator.sameValues('name', 'nameConfirm') ], null,
      { createError: (error: string) => 'Some errors occured', description: 'Custom form', title: 'Form title' });
  }

  ngOnInit() {
  }

}
