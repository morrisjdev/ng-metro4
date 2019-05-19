import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlBase} from '../control-base';
import * as moment from 'moment';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {WidePointType} from '../../helper/types';

const _moment = moment;
declare var $: any;

@Component({
  selector: 'm4-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DefaultValueAccessor.get(CalendarComponent)],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent extends ControlBase<moment.Moment|moment.Moment[]> {
  @Input('years-before') yearsBefore: number;
  @Input('years-after') yearsAfter: number;
  @Input('show') show: moment.Moment;
  @Input('picker-mode') pickerMode: boolean;
  @Input('locale') locale: string;
  @Input('week-start') weekStart: 0|1;
  @Input('outside') outside: boolean;
  @Input('buttons') buttons: string;
  @Input('ripple') ripple: boolean;
  @Input('ripple-color') rippleColor: string;
  @Input('exclude') exclude: moment.Moment[];
  @Input('special') special: moment.Moment[];
  @Input('min-date') minDate: moment.Moment;
  @Input('max-date') maxDate: moment.Moment;
  @Input('week-day-click') weekDayClick: boolean;
  @Input('multi-select') multiSelect: boolean;
  @Input('show-header') showHeader: boolean;
  @Input('show-footer') showFooter: boolean;
  @Input('wide-point') widePoint: WidePointType;
  @Input('wide') wide: boolean;

  @Input('cls-today') clsToday: string;
  @Input('cls-selected') clsSelected: string;
  @Input('cls-exclude') clsExclude: string;
  @Input('cls-cancel-button') clsCancelButton: string;
  @Input('cls-today-button') clsTodayButton: string;
  @Input('cls-clear-button') clsClearButton: string;
  @Input('cls-done-button') clsDoneButton: string;
  @Input('cls-calendar') clsCalendar: string;
  @Input('cls-calendar-header') clsCalendarHeader: string;
  @Input('cls-calendar-content') clsCalendarContent: string;
  @Input('cls-calendar-footer') clsCalendarFooter: string;
  @Input('cls-calendar-months') clsCalendarMonths: string;
  @Input('cls-calendar-years') clsCalendarYears: string;

  @ViewChild('object') private object: ElementRef;
  private calendar: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.object.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.calendar = this.clonedElement.calendar().data('calendar');

    setTimeout(() => {
      this.clonedElement.find('.calendar-content .day, .calendar-content span, .calendar-footer button').on('click', () => {
        this.touchCallback();
        this.clonedElement.find('.calendar-content .day, .calendar-content span, .calendar-footer button').unbind('click');
      });
    }, 0);

    this.calendar.options.onDone = (sel, el) => {
      const dates = sel.map(s => _moment(s));

      if (this.multiSelect) {
        this.changeValue(dates);
      } else {
        this.changeValue(dates.length > 0 ? dates[0] : null);
      }
    };
  }

  disable(disabled: boolean): void {
    setTimeout(() => {
      if (disabled) {
        this.clonedElement.addClass('disabled');
      } else {
        this.clonedElement.removeClass('disabled');
      }
    }, 0);
  }

  newValue(): void {
    if (!this.calendar) {
      return;
    }

    this.calendar.selected = [];

    setTimeout(() => {
      if (this.innerValue) {
        if (this.multiSelect) {
          this.calendar.setPreset((<moment.Moment[]>this.innerValue).map(v => v.format('MM/DD/YYYY')).join(','));
        } else {
          this.calendar.setPreset((<moment.Moment>this.innerValue).format('MM/DD/YYYY'));
        }
      } else {
        this.calendar.setPreset('');
      }
    }, 0);
  }

  convertMomentArray(arr: moment.Moment[]) {
    return arr ? arr.map(v => v.format('MM/DD/YYYY')).join(',') : null;
  }

  newClassValue(newClasses: string[], oldClasses: string[]) {
    setTimeout(() => {
      if (this.clonedElement) {
        const target = this.clonedElement;

        oldClasses.forEach((cls: string) => {
          target.removeClass(cls);
        });

        newClasses.forEach((cls: string) => {
          target.addClass(cls);
        });
      }
    }, 0);
  }
}
