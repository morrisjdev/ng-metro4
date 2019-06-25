import {Component, ContentChildren, ElementRef, forwardRef, QueryList} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {RadioComponent} from '../radio/radio.component';
import {StringHelper} from '../../helper/string-helper';
import {TypeAlias} from '../../helper/type-alias';

declare var $: any;

@Component({
  selector: 'm4-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
  providers: [DefaultValueAccessor.get(RadioGroupComponent), TypeAlias.get(RadioGroupComponent)]
})
export class RadioGroupComponent extends ControlBase<any> {
  @ContentChildren(forwardRef(() => RadioComponent), { descendants: true }) radios: QueryList<RadioComponent>;

  private name: string;

  constructor(element: ElementRef) {
    super(element);
    this.name = StringHelper.guid();
  }

  createControl() {
    setTimeout(() => {
      this.radios.forEach((item) => {
        item.name = this.name;
        item.registerOnChange((v) => {
          this.changeValue(v);
        });

        item.registerOnTouched(() => {
          this.touchCallback();
        });

        setTimeout(() => {
          item.createControl();
          this.callNewValue();
        }, 0);
      });
    }, 0);
  }

  disable(disabled: boolean): void {
    this.radios.forEach((item) => {
      setTimeout(() => {
        item.disable(disabled);
      }, 0);
    });
  }

  newValue(): void {
    if (!this.radios) {
      return;
    }

    this.radios.forEach((item) => {
      item.writeValue(this.innerValue);
    });
  }

  newClassValue(newClasses: string[], oldClasses: string[]) {}
}
