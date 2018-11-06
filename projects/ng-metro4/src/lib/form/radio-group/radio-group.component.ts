import {Component, ContentChildren, ElementRef, forwardRef, Input, OnInit, QueryList, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {RadioComponent} from '../radio/radio.component';
import {StringHelper} from '../../helper/string-helper';

declare var $: any;

@Component({
  selector: 'm4-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
  providers: [DefaultValueAccessor.get(RadioGroupComponent)]
})
export class RadioGroupComponent extends ControlBase<string> {
  @ContentChildren(forwardRef(() => RadioComponent), { descendants: true }) radios: QueryList<RadioComponent>;

  private name: string;

  constructor() {
    super();

    this.name = StringHelper.guid();
  }

  // @ViewChild('input') private input: ElementRef;
  // private clonedElement: any;
  // private radio: any;

  createControl() {
    this.radios.forEach((item) => {
      setTimeout(() => {
        item.name = this.name;
        item.registerOnChange((v) => {
          this.changeValue(v);
          console.log(v, this.innerValue);
        });

        setTimeout(() => {
          item.createControl();
        }, 0);
      }, 0);
    });

    // const originalElement = $(this.input.nativeElement);
    // originalElement.hide();
    //
    // if (this.clonedElement) {
    //   this.clonedElement.parent().remove();
    // }
    //
    // this.clonedElement = originalElement.clone().show();
    // originalElement.parent().append(this.clonedElement);
    //
    // this.radio = this.clonedElement.radio().data('radio');
    //
    // this.clonedElement.one('blur', () => {
    //   this.touchCallback();
    // });
    //
    // this.clonedElement.on('change', (event) => {
    //   this.changeValue(this.clonedElement.val());
    // });
  }

  disable(disabled: boolean): void {
    if (disabled) {
      // this.clonedElement.attr('disabled', '');
      // this.radio.disable();
    } else {
      // this.clonedElement.attr('disabled', null);
      // this.radio.enable();
    }
  }

  newValue(): void {
    // if (!this.radio) {
    //   return;
    // }

    // if (this.innerValue === this.value) {
    //   this.clonedElement.prop('checked', true);
    // } else {
    //   this.clonedElement.prop('checked', false);
    // }
  }
}
