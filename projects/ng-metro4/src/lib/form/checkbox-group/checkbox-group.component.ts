import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  QueryList, ViewChildren
} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {ArrayHelper} from '../../helper/array-helper';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';

@Component({
  selector: 'm4-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css'],
  providers: [DefaultValueAccessor.get(CheckboxGroupComponent), TypeAlias.get(CheckboxGroupComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent extends ControlBase<any[]> {

  @Input() readonly = false;
  @Input() options: { [title: string]: any };

  @ContentChildren(forwardRef(() => CheckboxComponent), { descendants: true }) checkboxesContent: QueryList<CheckboxComponent>;
  @ViewChildren(forwardRef(() => CheckboxComponent)) checkboxesView: QueryList<CheckboxComponent>;

  private checkboxes: QueryList<CheckboxComponent>;

  constructor(element: ElementRef, cdRef: ChangeDetectorRef) {
    super(element, cdRef);
  }

  createControl() {
    return new Promise<void>((complete) => {
      asapScheduler.schedule(() => {
        this.checkboxes = !!this.options ? this.checkboxesView : this.checkboxesContent;

        const checkboxCreations = this.checkboxes.map((item) => {
          return new Promise<void>((checkboxComplete) => {
            item.updateProperty('readonly', this.readonly);

            item.registerOnChange((v) => {
              this.computeInnerValue();
            });

            item.registerOnTouched(() => {
              this.touchCallback();
            });

            asapScheduler.schedule(() => {
              item.createControl().then(() => {
                checkboxComplete();
              });
            });
          });
        });

        Promise.all(checkboxCreations).then(() => {
          this.callNewValue();
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

  newClassValue(newClasses: string[], oldClasses: string[]) {
    this.checkboxes.forEach((item) => {
      asapScheduler.schedule(() => {
        item.newClassValue(newClasses, oldClasses);
      }, 1);
    });
  }
}
