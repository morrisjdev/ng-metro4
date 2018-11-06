import {AfterViewInit, Component, ContentChildren, ElementRef, forwardRef, Input, OnInit, QueryList, ViewChild} from '@angular/core';
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
export class RadioGroupComponent extends ControlBase<any> {
  @ContentChildren(forwardRef(() => RadioComponent), { descendants: true }) radios: QueryList<RadioComponent>;

  private name: string;

  constructor() {
    super();
    this.name = StringHelper.guid();
  }

  createControl() {
    setTimeout(() => {
      this.radios.forEach((item) => {
        item.name = this.name;
        item.registerOnChange((v) => {
          this.changeValue(v);
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
}
