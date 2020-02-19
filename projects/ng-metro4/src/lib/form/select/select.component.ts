import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';
import {StringHelper} from '../../helper/string-helper';

declare var $: any;

export interface Option {
  title: string;
  dataTemplate: string;
  value: any;
}

@Component({
  selector: 'm4-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [DefaultValueAccessor.get(SelectComponent), TypeAlias.get(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends ControlBase<object|object[]> implements OnChanges {

  @Input('options') options: { [key: string]: (string | { [key: string]: string }) } |
    (Option | { groupName: string, options: Option[] })[];
  @Input('multiple') multiple = false;
  @Input('duration') duration = 0;
  @Input('prepend') prepend: string;
  @Input('append') append: string;
  @Input('drop-height') dropHeight: number;
  @Input('filter') filter: boolean;
  @Input('filter-placeholder') filterPlaceholder: string;

  @Input('cls-select') clsSelect: string;
  @Input('cls-prepend') clsPrepend: string;
  @Input('cls-append') clsAppend: string;
  @Input('cls-option') clsOption: string;
  @Input('cls-option-group') clsOptionGroup: string;
  @Input('cls-drop-list') clsDropList: string;
  @Input('cls-selected-item') clsSelectedItem: string;
  @Input('cls-selected-item-remover') clsSelectedItemRemover: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private select: any;
  private clonedElement: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.input.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.children().appendTo(originalElement);
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      originalElement.children().appendTo(this.clonedElement);
      this.select = this.clonedElement.select().data('select');

      this.clonedElement.parent().on('mousedown', (ev: MouseEvent) => {
        if (ev.button === 0) {
          this.touchCallback();
          this.clonedElement.parent().off('mousedown');
        }
      });

      this.select.options.onChange = (val) => {
        if (this.options instanceof Array) {
          const allOptions: Option[] = [];

          this.options.forEach((option: Option  | { options: Option[] }) => {
            if (!!(<any>option).options) {
              (<any>option).options.forEach((subOption: Option) => {
                allOptions.push(subOption);
              });
            } else {
              allOptions.push(<Option>option);
            }
          });

          val = val.map(key => allOptions.find(option => StringHelper.createHash(option.value) === key)).filter(v => !!v).map(v => v.value);
        }

        if (this.multiple) {
          this.changeValue(val.slice(0));
        } else {
          this.changeValue(val[0]);
        }
      };

      if (this.options && !(this.options instanceof Array)) {
        this.select.data(this.options);
      }

      complete();
    });

  }

  disable(disabled: boolean) {
    if (disabled) {
      this.select.disable();
    } else {
      this.select.enable();
    }
  }

  newValue() {
    if (!this.select) {
      return;
    }

    let selectValue: any[] = this.multiple ? <any[]>this.innerValue : [ this.innerValue ];

    if (this.options instanceof Array) {
      selectValue = selectValue.map(v => StringHelper.createHash(v));
    }

    if (this.multiple) {
      this.select.reset();
    }

    this.select.val(selectValue);
  }

  newClassValue(newClasses: string[], oldClasses: string[]) {
    asapScheduler.schedule(() => {
      if (this.clonedElement) {
        const target = this.clonedElement.parent();

        oldClasses.forEach((cls: string) => {
          target.removeClass(cls);
        });

        newClasses.forEach((cls: string) => {
          target.addClass(cls);
        });
      }
    }, 1);
  }
}
