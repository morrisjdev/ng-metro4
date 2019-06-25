import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {forwardRef} from '@angular/core';
import {ControlBase} from '../form/control-base';

export class TypeAlias {
  public static get(type: any) {
    return {
      provide: ControlBase,
      useExisting: forwardRef(() => type)
    };
  }
}
