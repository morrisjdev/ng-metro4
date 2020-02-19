import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlBase} from '../control-base';
import * as moment from 'moment';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {ObjectHelper} from '../../helper/object-helper';

const _moment = moment;
declare var $: any;

@Component({
  selector: 'm4-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
  providers: [DefaultValueAccessor.get(DatePickerComponent), TypeAlias.get(DatePickerComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent extends ControlBase<moment.Moment> {

  @Input('month') month: boolean;
  @Input('day') day: boolean;
  @Input('year') year: boolean;
  @Input('locale') locale: string;
  @Input('min-year') minYear: number;
  @Input('max-year') maxYear: number;
  @Input('distance') distance: number;

  @Input('cls-picker') clsPicker: string;
  @Input('cls-start') clsStart: string;
  @Input('cls-month') clsMonth: string;
  @Input('cls-day') clsDay: string;
  @Input('cls-year') clsYear: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private datePicker: any;
  private clonedElement: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.input.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.datePicker = this.clonedElement.datepicker().data('datepicker');

      this.clonedElement.parent().find('.date-wrapper').one('click', () => {
        this.touchCallback();
      });

      this.datePicker.options.onSet = (val, elem_val) => {
        this.changeValue(_moment(elem_val, 'YYYY-MM-DD'));
      };

      complete();
    });

  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.clonedElement.parent().addClass('disabled');
    } else {
      this.clonedElement.parent().removeClass('disabled');
    }
  }

  newValue(): void {
    if (!this.datePicker) {
      return;
    }

    this.datePicker.val(this.innerValue ? this.innerValue.format('YYYY-MM-DD') : '');
  }

  newClassValue(newClasses: string[], oldClasses: string[]) {
    if (this.clonedElement) {
      const target = this.clonedElement.parent();

      oldClasses.forEach((cls: string) => {
        target.removeClass(cls);
      });

      newClasses.forEach((cls: string) => {
        target.addClass(cls);
      });
    }
  }
}
