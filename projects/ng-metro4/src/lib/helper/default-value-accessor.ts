import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {forwardRef} from '@angular/core';

export class DefaultValueAccessor {
  public static get(type: any) {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => type),
      multi: true
    };
  }
}
