import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';

declare var $: any;

@Component({
  selector: 'm4-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css'],
  providers: [DefaultValueAccessor.get(KeypadComponent)]
})
export class KeypadComponent extends ControlBase<string|number> {
  @Input('type') type = 'text';
  @Input('key-size') keySize: number;
  @Input('keys') keys: string[];
  @Input('length') length: number;
  @Input('shuffle') shuffle: boolean;
  @Input('shuffle-count') shuffleCount: number;
  @Input('position') position: 'left'|'top-left'|'top'|'top-right'|'right'|'bottom-right'|'bottom'|'bottom-left';
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

  @ViewChild('input') private input: ElementRef;
  private keypad: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.keypad = this.clonedElement.keypad().data('keypad');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('change', (event) => {
      setTimeout(() => {
        let newValue = this.clonedElement.val();

        if (this.type === 'number') {
          newValue = +newValue;
        }

        this.changeValue(newValue);
      }, 0);
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
    if (!this.keypad || !this.innerValue) {
      return;
    }

    this.keypad.val(this.innerValue.toString());
  }

}
