import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

  public formGroup: FormGroup;

  constructor() {

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl(''),
      remember: new FormControl(false)
    });
  }

  ngOnInit() {
  }

}
