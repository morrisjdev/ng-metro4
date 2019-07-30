import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';

declare var $: any;

interface Option {
  title: string;
  dataTemplate: string;
  value: any;
}

@Component({
  selector: 'm4-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [DefaultValueAccessor.get(SelectComponent), TypeAlias.get(SelectComponent)]
})
export class SelectComponent extends ControlBase<string|string[]> implements OnChanges {
  @Input('options') options: { [key: string]: (string | { [key: string]: string }) } |
    (Option | { groupName: string, options: Option[] })[];
  @Input('multiple') multiple = false;
  @Input('duration') duration: number;
  @Input('prepend') prepend: string;
  @Input('append') append: string;
  @Input('dropHeight') dropHeight: number;
  @Input('filter') filter: boolean;
  @Input('filterPlaceholder') filterPlaceholder: string;

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
      originalElement.hide();

      if (this.clonedElement) {
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone().show();
      originalElement.parent().append(this.clonedElement);

      this.clonedElement.html(this.clonedElement.find('[options]').html());
      this.select = this.clonedElement.select().data('select');

      this.clonedElement.parent().on('mousedown', (ev: MouseEvent) => {
        if (ev.button === 0) {
          this.touchCallback();
          this.clonedElement.parent().unbind('mousedown');
        }
      });

      this.select.options.onChange = (val) => {
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
      this.select.enabled();
    }
  }

  newValue() {
    if (!this.select) {
      return;
    }

    if (this.multiple) {
      const oldConsoleLog = console.log;
      console.log = () => {};

      this.select.reset();

      console.log = oldConsoleLog;

      this.select.val(this.innerValue);
    } else {
      this.select.val([this.innerValue]);
    }
  }

  renderOptions(): boolean {
    return this.options instanceof Array;
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
