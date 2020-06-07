import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import * as moment from 'moment';
import {WidePointType} from '../../helper/types';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';

const _moment = moment;
declare var $: any;

@Component({
  selector: 'm4-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.css'],
  providers: [DefaultValueAccessor.get(CalendarPickerComponent), TypeAlias.get(CalendarPickerComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPickerComponent extends ControlBase<moment.Moment> {

  @Input('calendar-wide') calendarWide: boolean;
  @Input('calendar-wide-point') calendarWidePoint: WidePointType;
  @Input('dialog-mode') dialogMode: boolean;
  @Input('dialog-point') dialogPoint: number;
  @Input('dialog-overlay') dialogOverlay: boolean;
  @Input('overlay-color') overlayColor: string;
  @Input('overlay-alpha') overlayAlpha: number;
  @Input('locale') locale: string;
  @Input('size') size: string;
  @Input('format') format: string;
  @Input('clear-button') clearButton: boolean;
  @Input('clear-button-icon') clearButtonIcon: string;
  @Input('calendar-button-icon') calendarButtonIcon: string;
  @Input('years-before') yearsBefore: number;
  @Input('years-after') yearsAfter: number;
  @Input('week-start') weekStart: 0|1;
  @Input('outside') outside: boolean;
  @Input('ripple') ripple: boolean;
  @Input('ripple-color') rippleColor: string;
  @Input('exclude') exclude: moment.Moment[];
  @Input('include') include: moment.Moment[];
  @Input('min-date') minDate: moment.Moment;
  @Input('max-date') maxDate: moment.Moment;
  @Input('show-header') showHeader: boolean;

  @Input('cls-picker') clsPicker: string;
  @Input('cls-today') clsToday: string;
  @Input('cls-selected') clsSelected: string;
  @Input('cls-exclude') clsExclude: string;
  @Input('cls-calendar') clsCalendar: string;
  @Input('cls-calendar-header') clsCalendarHeader: string;
  @Input('cls-calendar-content') clsCalendarContent: string;
  @Input('cls-calendar-months') clsCalendarMonths: string;
  @Input('cls-calendar-years') clsCalendarYears: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private calendarPicker: any;
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

      this.calendarPicker = this.clonedElement.calendarpicker().data('calendarpicker');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.calendarPicker.options.onChange = () => {
        asapScheduler.schedule(() => {
          const val = this.calendarPicker.value;
          this.changeValue(val ? _moment(val.toLocaleDateString('en'), 'MM/DD/YYYY') : null);
        });
      };

      complete();
    });

  }

  disable(disabled: boolean): void {
    asapScheduler.schedule(() => {
      if (disabled) {
        this.calendarPicker.disable();
      } else {
        this.calendarPicker.enable();
      }
    });
  }

  newValue(): void {
    if (!this.calendarPicker) {
      return;
    }

    asapScheduler.schedule(() => {
      this.calendarPicker.val(this.innerValue ? this.innerValue.format('MM/DD/YYYY') : '01/01/0000');
    });
  }

  convertMomentArray(arr: moment.Moment[]) {
    return arr ? arr.map(v => v.format('MM/DD/YYYY')).join(',') : null;
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
    });
  }
}
