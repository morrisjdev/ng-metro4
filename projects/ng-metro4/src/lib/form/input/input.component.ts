import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DefaultValueAccessor.get(InputComponent)]
})
export class InputComponent extends ControlBase<string|number> {
  @Input('type') type = 'text';
  @Input('default-value') defaultValue: any;
  @Input('size') size: number;
  @Input('prepend') prepend: string;
  @Input('append') append: string;
  @Input('clear-button') clearButton: boolean;
  @Input('clear-button-icon') clearButtonIcon: string;
  @Input('reveal-button') revealButton: boolean;
  @Input('reveal-button-icon') revealButtonIcon: string;
  @Input('custom-buttons') customButtons: { html: string, cls: string, onclick: string }[];

  @Input('cls-component') clsComponent: string;
  @Input('cls-input') clsInput: string;
  @Input('cls-prepend') clsPrepend: string;
  @Input('cls-append') clsAppend: string;
  @Input('cls-clear-button') clsClearButton: string;
  @Input('cls-reveal-button') clsRevealButton: string;
  @Input('cls-custom-button') clsCustomButton: string;

  @ViewChild('input') private input: ElementRef;
  private inputObj: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.inputObj = this.clonedElement.input().data('input');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('keydown change', (event) => {
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
      this.inputObj.disable();
    } else {
      this.inputObj.enable();
    }
  }

  newValue(): void {
    if (!this.inputObj) {
      return;
    }

    this.clonedElement.val(this.innerValue);
  }
}
