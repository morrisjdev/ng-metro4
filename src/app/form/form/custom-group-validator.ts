import {FormGroup, ValidatorFn} from '@angular/forms';

export class CustomGroupValidator {
  static sameValues(...fieldKeys: string[]): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const formValue = formGroup.value;

      const firstValue = formValue[fieldKeys[0]];

      for (let i = 1; i < fieldKeys.length; i++) {
        if (formValue[fieldKeys[i]] !== firstValue) {
          return {
            'same': 'Values do not match'
          };
        }
      }

      return null;
    };
  }
}
