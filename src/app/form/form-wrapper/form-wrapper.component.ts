import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {M4FormGroup} from 'ng-metro4';
import {CustomGroupValidator} from '../form/custom-group-validator';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.less']
})
export class FormWrapperComponent implements OnInit {

  public formGroup: FormGroup;

  constructor() {
    this.formGroup = new M4FormGroup('form_wrapper', {
      password: new FormControl('', [Validators.required]),
      password_confirm: new FormControl('', [Validators.required]),
    }, [CustomGroupValidator.sameValues('password', 'password_confirm')]);
  }

  ngOnInit() {
  }

}
