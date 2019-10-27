import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {InputComponent, M4FormControl} from 'ng-metro4';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.less']
})
export class DynamicFormControlComponent implements OnInit {
  public formControl: M4FormControl<InputComponent>;
  public formControlInital: M4FormControl<InputComponent>;
  public formControlValidators: M4FormControl<InputComponent>;
  public formControlOptions: M4FormControl<InputComponent>;
  public formControlStyle: M4FormControl<InputComponent>;

  constructor() {
    this.formControl = new M4FormControl(InputComponent);
    this.formControlInital = new M4FormControl(InputComponent, 'This is the value');
    this.formControlValidators = new M4FormControl(InputComponent, null, [ Validators.required ], [ /* Async validators */ ]);
    this.formControlOptions = new M4FormControl(InputComponent, null, null, null,
      { prepend: 'Prepend', append: 'Append' });
    this.formControlStyle = new M4FormControl(
      InputComponent, null, [ Validators.required ], null, null,
      { createError: (error: string) => 'Something missing?' });
  }

  ngOnInit() {
  }

}
