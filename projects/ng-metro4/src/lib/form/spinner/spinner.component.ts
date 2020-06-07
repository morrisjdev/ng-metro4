import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {SpinnerButtonPositionType} from '../../helper/types';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  providers: [DefaultValueAccessor.get(SpinnerComponent), TypeAlias.get(SpinnerComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent extends ControlBase<number> {

  @Input('step') step = 1;
  @Input('plus-icon') plusIcon: string;
  @Input('minus-icon') minusIcon: string;
  @Input('buttons-position') buttonsPosition: SpinnerButtonPositionType;
  @Input('min-value') minValue: number;
  @Input('max-value') maxValue: number;
  @Input('fixed') fixed = 0;
  @Input('hide-cursor') hideCursor = false;

  @Input('cls-spinner') clsSpinner: string;
  @Input('cls-spinner-input') clsSpinnerInput: string;
  @Input('cls-spinner-button') clsSpinnerButton: string;
  @Input('cls-spinner-button-plus') clsSpinnerButtonPlus: string;
  @Input('cls-spinner-button-minus') clsSpinnerButtonMinus: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private spinner: any;
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

      this.spinner = this.clonedElement.spinner().data('spinner');

      this.clonedElement.parent().off('mousedown mouseup keydown change');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('change', () => {
        if (this.disableUpdate) {
          return;
        }

        const newVal = +this.clonedElement.val();

        this.changeValue(newVal);
        this.setValue(newVal);
      });

      complete();
    });

  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.spinner.disable();
    } else {
      this.spinner.enable();
    }
  }

  setValue(newValue: number) {
    if (this.minValue !== undefined && this.minValue !== null && newValue < this.minValue) {
      newValue = this.minValue;

      asapScheduler.schedule(() => {
        this.changeValue(newValue);
      });
    }

    if (this.maxValue !== undefined && this.maxValue !== null && newValue > this.maxValue) {
      newValue = this.maxValue;

      asapScheduler.schedule(() => {
        this.changeValue(newValue);
      });
    }

    this.clonedElement.val(newValue.toFixed(this.fixed));
  }

  newValue(): void {
    if (!this.spinner || !this.innerValue) {
      return;
    }

    this.setValue(this.innerValue);
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
