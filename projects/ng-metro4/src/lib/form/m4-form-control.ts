import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {ControlBase} from './control-base';

export interface ControlStyle {
  label?: string|Observable<string>;
  description?: string|Observable<string>;
  hideErrors?: boolean;
  createError?: (error: string) => string|Observable<string>;
}

export class M4FormControl<T extends ControlBase<any>> extends FormControl {
  public fieldName: string;
  public index: number;

  constructor(public controlType: new (...args: any[]) => T,
              formState?: any,
              validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
              public controlOptions?: Partial<T>,
              public controlStyle?: ControlStyle) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}
