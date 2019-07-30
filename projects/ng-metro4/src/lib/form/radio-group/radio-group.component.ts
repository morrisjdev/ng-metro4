import {Component, ContentChildren, ElementRef, forwardRef, QueryList} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {RadioComponent} from '../radio/radio.component';
import {StringHelper} from '../../helper/string-helper';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';

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
    return new Promise<void>((complete) => {
      asapScheduler.schedule(() => {
        this.radios.forEach((item) => {
          item.name = this.name;
          item.registerOnChange((v) => {
            this.changeValue(v);
          });

          item.registerOnTouched(() => {
            this.touchCallback();
          });

          asapScheduler.schedule(() => {
            item.createControl();
            this.callNewValue();
          }, 1);

          complete();
        });
      });
    });

  }

  disable(disabled: boolean): void {
    this.radios.forEach((item) => {
      asapScheduler.schedule(() => {
        item.disable(disabled);
      }, 1);
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
