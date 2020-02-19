import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {PositionHorizontalType} from '../../helper/types';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  providers: [DefaultValueAccessor.get(CheckboxComponent), TypeAlias.get(CheckboxComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent extends ControlBase<boolean> {

  @Input('value') value: any;

  @Input('readonly') readonly = false;
  @Input('style') style: 1|2;
  @Input('caption') caption: string;
  @Input('caption-position') captionPosition: PositionHorizontalType;
  @Input('indeterminate') indeterminate: boolean;

  @Input('cls-checkbox') clsCheckbox: string;
  @Input('cls-caption') clsCaption: string;
  @Input('cls-check') clsCheck: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private clonedElement: any;
  private checkbox: any;

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

      this.checkbox = this.clonedElement.checkbox().data('checkbox');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('change', () => {
        this.changeValue(this.clonedElement.prop('checked'));
      });

      complete();
    });

  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.clonedElement.attr('disabled', 'disabled');
      this.checkbox.disable();
    } else {
      this.clonedElement.removeAttr('disabled');
      this.checkbox.enable();
    }
  }

  newValue(): void {
    if (!this.checkbox) {
      return;
    }

    this.clonedElement.prop('checked', this.innerValue);
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
