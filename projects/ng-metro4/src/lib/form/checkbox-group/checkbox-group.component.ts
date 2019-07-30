import {Component, ContentChildren, ElementRef, forwardRef, OnInit, QueryList} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {RadioComponent} from '../radio/radio.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {ArrayHelper} from '../../helper/array-helper';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';

@Component({
  selector: 'm4-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css'],
  providers: [DefaultValueAccessor.get(CheckboxGroupComponent), TypeAlias.get(CheckboxGroupComponent)]
})
export class CheckboxGroupComponent extends ControlBase<any[]> {
  @ContentChildren(forwardRef(() => CheckboxComponent), { descendants: true }) checkboxes: QueryList<CheckboxComponent>;

  constructor(element: ElementRef) {
    super(element);
  }

  createControl() {
    return new Promise<void>((complete) => {
      asapScheduler.schedule(() => {
        this.checkboxes.forEach((item) => {
          item.registerOnChange((v) => {
            this.computeInnerValue();
          });

          item.registerOnTouched(() => {
            this.touchCallback();
          });

          asapScheduler.schedule(() => {
            item.createControl();
            this.callNewValue();
          });

          complete();
        });
      });


    });

  }

  private computeInnerValue() {
    const values = this.checkboxes.filter(item => item.innerValue === true && item.value).map(item => item.value);
    this.changeValue(values);
  }

  disable(disabled: boolean): void {
    this.checkboxes.forEach((item) => {
      asapScheduler.schedule(() => {
        item.disable(disabled);
      });
    });
  }

  newValue(): void {
    if (!this.checkboxes) {
      return;
    }

    this.checkboxes.forEach((item) => {
      item.writeValue(this.innerValue && ArrayHelper.contains(this.innerValue, item.value));
    });
  }

  newClassValue(newClasses: string[], oldClasses: string[]) {}
}
