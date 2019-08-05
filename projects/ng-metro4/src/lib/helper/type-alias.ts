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
