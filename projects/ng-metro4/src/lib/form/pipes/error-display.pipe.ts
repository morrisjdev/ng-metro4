import { Pipe, PipeTransform } from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Pipe({
  name: 'errorDisplay'
})
export class ErrorDisplayPipe implements PipeTransform {

  transform(errors: ValidationErrors|null, formControlPath: string): any {
    if (!errors) {
      return [];
    }

    const errorKeys = Object.keys(errors);
    return errorKeys.map(key => `${formControlPath}errors.${key}`);
  }

}
