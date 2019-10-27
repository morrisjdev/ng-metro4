import {Component, OnInit, ViewChild} from '@angular/core';
import {M4FormControl, M4FormGroup} from 'ng-metro4';
import {Validators} from '@angular/forms';
import {of, timer} from 'rxjs';
import {CustomGroupValidator} from '../form/custom-group-validator';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.less']
})
export class FormBuilderComponent implements OnInit {
  formGroup = new M4FormGroup('form_builder', {
    name: new M4FormControl('input', { value: 'test123', disabled: false }, [ Validators.required ], null,
      { prepend: 'Das ist ein test' }, { description: '<span class="mif-home"></span>', createError: (err) => `<span class="mif-home"></span> ${err}` }),
    name2: new M4FormControl('input', null, [ Validators.required ], null,
      { prepend: 'Das ist ein test' }, { description: 'test123' }),
    number: new M4FormControl('slider', null, [ Validators.min(30) ]),
    file: new M4FormControl('file-input', null, null, null, { read: 'text' }),
    name3: new M4FormControl('input'),
    name4: new M4FormControl('input'),
    name5: new M4FormControl('input'),
    name6: new M4FormControl('input'),
    name7: new M4FormControl('input'),
  }, [ CustomGroupValidator.sameValues('name', 'name2') ], null, { description: of('Test Form'), title: 'Test form' });

  constructor() { }

  ngOnInit() {
  }

}
