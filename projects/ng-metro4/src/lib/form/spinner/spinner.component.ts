import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  providers: [DefaultValueAccessor.get(SpinnerComponent)]
})
export class SpinnerComponent extends ControlBase<number> {
  @Input('step') step = 1;
  @Input('plus-icon') plusIcon: string;
  @Input('minus-icon') minusIcon: string;
  @Input('buttons-position') buttonsPosition: 'default'|'left'|'right';
  @Input('min-value') minValue: number;
  @Input('max-value') maxValue: number;
  @Input('fixed') fixed = 0;
  @Input('hide-cursor') hideCursor = false;

  @Input('cls-spinner') clsSpinner: string;
  @Input('cls-spinner-input') clsSpinnerInput: string;
  @Input('cls-spinner-button') clsSpinnerButton: string;
  @Input('cls-spinner-button-plus') clsSpinnerButtonPlus: string;
  @Input('cls-spinner-button-minus') clsSpinnerButtonMinus: string;

  @ViewChild('input') private input: ElementRef;
  private spinner: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.spinner = this.clonedElement.spinner().data('spinner');

    this.clonedElement.parent().off('mousedown mouseup keydown change');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.parent().find('button.spinner-button-plus').on('click', () => {
      this.stepUp();
    });

    this.clonedElement.parent().find('button.spinner-button-minus').on('click', () => {
      this.stepDown();
    });

    this.clonedElement.off('keydown').on('keydown', (e) => {
      if (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) {
        // Allow ctrl + a
      } else if (e.keyCode >= 65 && e.keyCode <= 90) {
        e.preventDefault();
      }

      if ([38, 40].indexOf(e.keyCode) !== -1) {
        e.preventDefault();
      }

      if (e.keyCode === 38) {
        this.stepUp();
      } else if (e.keyCode === 40) {
        this.stepDown();
      }
    }).on('change', () => {
      if (this.disableUpdate) {
        return;
      }

      const newVal = +this.clonedElement.val();

      this.changeValue(newVal);
      this.setValue(newVal);
    });
  }

  stepUp() {
    const newValue = this.innerValue + this.step;

    if (this.maxValue == null || newValue <= this.maxValue) {
      this.changeValue(newValue);
      this.setValue(newValue);
    }
  }

  stepDown() {
    const newValue = this.innerValue - this.step;

    if (this.minValue == null || newValue >= this.minValue) {
      this.changeValue(newValue);
      this.setValue(newValue);
    }
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.spinner.disable();
    } else {
      this.spinner.enable();
    }
  }

  setValue(newValue: number) {
    if (this.minValue && newValue < this.minValue) {
      newValue = this.minValue;

      setTimeout(() => {
        this.changeValue(newValue);
      }, 0);
    }

    if (this.maxValue && newValue > this.maxValue) {
      newValue = this.maxValue;

      setTimeout(() => {
        this.changeValue(newValue);
      }, 0);
    }

    this.clonedElement.val(newValue.toFixed(this.fixed));
  }

  newValue(): void {
    if (!this.spinner || !this.innerValue) {
      return;
    }

    this.setValue(this.innerValue);
  }
}
