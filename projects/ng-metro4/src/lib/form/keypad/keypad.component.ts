import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {InputType, PositionType} from '../../helper/types';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css'],
  providers: [DefaultValueAccessor.get(KeypadComponent), TypeAlias.get(KeypadComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeypadComponent extends ControlBase<string|number> {

  @Input('type') type: InputType = 'text';
  @Input('key-size') keySize: number;
  @Input('keys') keys: string[];
  @Input('key-length') keyLength: number;
  @Input('shuffle') shuffle: boolean;
  @Input('shuffle-count') shuffleCount: number;
  @Input('position') position: PositionType;
  @Input('dynamic-position') dynamicPosition: boolean;
  @Input('service-buttons') serviceButtons: boolean;
  @Input('show-value') showValue: boolean;
  @Input('open') open: boolean;
  @Input('size-as-keys') sizeAsKeys: boolean;

  @Input('cls-keypad') clsKeypad: string;
  @Input('cls-input') clsInput: string;
  @Input('cls-keys') clsKeys: string;
  @Input('cls-key') clsKey: string;
  @Input('cls-service-key') clsServiceKey: string;
  @Input('cls-backspace') clsBackspace: string;
  @Input('cls-clear') clsClear: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private keypad: any;
  private clonedElement: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.input.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.keypad = this.clonedElement.keypad().data('keypad');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('change', () => {
        asapScheduler.schedule(() => {
          let newValue = this.clonedElement.val();

          if (this.type === 'number') {
            newValue = +newValue;
          }

          this.changeValue(newValue);
        });
      });

      complete();
    });


  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.keypad.disable();
    } else {
      this.keypad.enable();
    }
  }

  newValue(): void {
    if (!this.keypad) {
      return;
    }

    this.keypad.val(this.innerValue ? this.innerValue.toString() : '');
  }

  newClassValue(newClasses: string[], oldClasses: string[]) {
    if (this.clonedElement) {
      const target = this.clonedElement.parent();

      oldClasses.forEach((cls: string) => {
        target.removeClass(cls);
      });

      newClasses.forEach((cls: string) => {
        target.addClass(cls);
      });
    }
  }

}
