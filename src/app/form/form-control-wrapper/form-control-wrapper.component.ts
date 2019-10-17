import { Component, OnInit } from '@angular/core';
import {M4FormGroup} from 'ng-metro4';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomGroupValidator} from '../form/custom-group-validator';

@Component({
  selector: 'app-form-control-wrapper',
  templateUrl: './form-control-wrapper.component.html',
  styleUrls: ['./form-control-wrapper.component.less']
})
export class FormControlWrapperComponent implements OnInit {
  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new M4FormGroup('form_control_wrapper', {
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

}
