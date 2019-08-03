import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, forwardRef, QueryList} from '@angular/core';
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
  providers: [DefaultValueAccessor.get(RadioGroupComponent), TypeAlias.get(RadioGroupComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
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
        const radioCreations = this.radios.map((item) => {
          return new Promise<void>((radioComplete) => {
            item.name = this.name;
            item.registerOnChange((v) => {
              this.changeValue(v);
            });

            item.registerOnTouched(() => {
              this.touchCallback();
            });

            asapScheduler.schedule(() => {
              item.createControl().then(() => {
                radioComplete();
              });
            }, 1);
          });
        });

        Promise.all(radioCreations).then(() => {
          this.callNewValue();
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
