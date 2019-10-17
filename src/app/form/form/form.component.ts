import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {M4FormGroup} from 'ng-metro4';
import {CustomGroupValidator} from './custom-group-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

  public formGroup: FormGroup;

  constructor() {

    this.formGroup = new M4FormGroup('reactive_demo', {
      name: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
      password: new FormControl('s'),
      password_confirm: new FormControl(''),
      remember: new FormControl(false, [Validators.requiredTrue])
    }, [CustomGroupValidator.sameValues('password', 'password_confirm')]);
  }

  ngOnInit() {
  }

}
