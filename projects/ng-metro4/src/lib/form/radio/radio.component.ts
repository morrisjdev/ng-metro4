import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [DefaultValueAccessor.get(RadioComponent)]
})
export class RadioComponent extends ControlBase<string> {
  @Input('name') name: string;
  @Input('value') value: string;

  @ViewChild('input') private input: ElementRef;
  private clonedElement: any;
  private radio: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.radio = this.clonedElement.radio().data('radio');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('change', (event) => {
      this.changeValue(this.clonedElement.val());
    });
  }

  disable(disabled: boolean): void {
    setTimeout(() => {
      if (disabled) {
        this.clonedElement.parent().addClass('disabled');
        this.clonedElement.attr('disabled', '');
      } else {
        this.clonedElement.parent().removeClass('disabled');
        this.clonedElement.attr('disabled', null);
      }
    }, 0);
  }

  newValue(): void {
    if (!this.radio) {
      return;
    }

    if (this.innerValue === this.value) {
      this.clonedElement.prop('checked', true);
    } else {
      this.clonedElement.prop('checked', false);
    }
  }

}
