import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [DefaultValueAccessor.get(CheckboxComponent)]
})
export class CheckboxComponent extends ControlBase<boolean> {
  @Input('style') style: 1|2;
  @Input('caption') caption: string;
  @Input('caption-position') captionPosition: 'left'|'right';
  @Input('indeterminate') indeterminate: boolean;

  @Input('cls-checkbox') clsCheckbox: string;
  @Input('cls-caption') clsCaption: string;
  @Input('cls-check') clsCheck: string;

  @ViewChild('input') private input: ElementRef;
  private clonedElement: any;
  private checkbox: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.checkbox = this.clonedElement.checkbox().data('checkbox');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('change', (event) => {
      this.changeValue(this.clonedElement.prop('checked'));
    });
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.clonedElement.attr('disabled', '');
      this.checkbox.disable();
    } else {
      this.clonedElement.attr('disabled', null);
      this.checkbox.enable();
    }
  }

  newValue(): void {
    if (!this.checkbox) {
      return;
    }

    this.clonedElement.prop('checked', this.innerValue);
  }

}
