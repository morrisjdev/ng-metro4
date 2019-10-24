import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {FormControlType} from '../helper/types';
import {Observable} from 'rxjs';

export interface ControlStyle {
  label?: string|Observable<string>;
  description?: string|Observable<string>;
  hideErrors?: boolean;
  createError?: (error: string) => string|Observable<string>;
}

export interface ControlOptions {
  [key: string]: any;
}

export class M4FormControl extends FormControl {
  public fieldName: string;
  public index: number;

  constructor(public controlType: FormControlType,
              formState?: any,
              validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
              public controlOptions?: ControlOptions,
              public controlStyle?: ControlStyle) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}
