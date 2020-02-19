import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlBase} from '../control-base';
import * as moment from 'moment';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {CalendarButtonType, WidePointType} from '../../helper/types';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';

const _moment = moment;
declare var $: any;

@Component({
  selector: 'm4-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  providers: [DefaultValueAccessor.get(CalendarComponent), TypeAlias.get(CalendarComponent)],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent extends ControlBase<moment.Moment|moment.Moment[]> {

  @Input('years-before') yearsBefore: number;
  @Input('years-after') yearsAfter: number;
  @Input('show') show: moment.Moment;
  @Input('picker-mode') pickerMode: boolean;
  @Input('locale') locale: string;
  @Input('week-start') weekStart: 0|1;
  @Input('outside') outside: boolean;
  @Input('buttons') buttons: CalendarButtonType[];
  @Input('ripple') ripple: boolean;
  @Input('ripple-color') rippleColor: string;
  @Input('exclude') exclude: moment.Moment[];
  @Input('include') include: moment.Moment[];
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

  @ViewChild('object', { static: true }) private object: ElementRef;
  private calendar: any;
  private clonedElement: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.object.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.calendar = this.clonedElement.calendar().data('calendar');

      asapScheduler.schedule(() => {
        this.clonedElement.find('.calendar-content .day, .calendar-content span, .calendar-footer button').on('click', () => {
          this.touchCallback();
          this.clonedElement.find('.calendar-content .day, .calendar-content span, .calendar-footer button').unbind('click');
        });
      });

      const selectDays = (selection) => {
        const dates = selection.map(s => _moment(s));

        if (this.multiSelect) {
          this.changeValue(dates);
        } else {
          this.changeValue(dates.length > 0 ? dates[0] : null);
        }
      };

      this.calendar.options.onDayClick = (selection) => {
        if (this.pickerMode) {
          selectDays(selection);
        }
      };

      this.calendar.options.onDone = (selection) => {
        selectDays(selection);
      };

      complete();
    });
  }

  disable(disabled: boolean): void {
    asapScheduler.schedule(() => {
      if (disabled) {
        this.clonedElement.addClass('disabled');
      } else {
        this.clonedElement.removeClass('disabled');
      }
    });
  }

  newValue(): void {
    if (!this.calendar) {
      return;
    }

    this.calendar.selected = [];

    asapScheduler.schedule(() => {
      if (this.innerValue) {
        if (this.multiSelect) {
          this.calendar.setPreset((<moment.Moment[]>this.innerValue).map(v => v.format('MM/DD/YYYY')).join(','));
        } else {
          this.calendar.setPreset((<moment.Moment>this.innerValue).format('MM/DD/YYYY'));
        }
      } else {
        this.calendar.setPreset('');
      }
    });
  }

  convertMomentArray(arr: moment.Moment[]) {
    return arr ? arr.map(v => v.format('MM/DD/YYYY')).join(',') : null;
  }

  newClassValue(newClasses: string[], oldClasses: string[]) {
    asapScheduler.schedule(() => {
      if (this.clonedElement) {
        const target = this.clonedElement;

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
