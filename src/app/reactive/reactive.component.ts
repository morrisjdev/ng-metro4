import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.less']
})
export class ReactiveComponent implements OnInit {

  public formGroup: FormGroup;

  constructor() {

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit() {
  }

}
