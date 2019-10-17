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
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
      number: new FormControl(10, [Validators.min(5), Validators.max(30)]),
      password_confirm: new FormControl('', [Validators.required]),
      remember: new FormControl(false, [Validators.requiredTrue])
    }, [CustomGroupValidator.sameValues('password', 'password_confirm')]);
  }

  alert(value) {
    alert(JSON.stringify(value));
  }

  ngOnInit() {
  }

}
