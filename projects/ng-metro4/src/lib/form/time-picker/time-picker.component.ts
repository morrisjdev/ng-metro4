import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import * as moment from 'moment';
import {TypeAlias} from '../../helper/type-alias';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.less'],
  providers: [DefaultValueAccessor.get(TimePickerComponent), TypeAlias.get(TimePickerComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimePickerComponent extends ControlBase<moment.Duration> {

  @Input('hours') hours: boolean;
  @Input('minutes') minutes: boolean;
  @Input('seconds') seconds: boolean;
  @Input('show-labels') showLabels = true;
  @Input('locale') locale: string;
  @Input('distance') distance: number;

  @Input('cls-picker') clsPicker: string;
  @Input('cls-part') clsPart: string;
  @Input('cls-hours') clsHours: string;
  @Input('cls-minutes') clsMinutes: string;
  @Input('cls-seconds') clsSeconds: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private timePicker: any;
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

      this.timePicker = this.clonedElement.timepicker().data('timepicker');

      this.clonedElement.parent().find('.time-wrapper').one('click', () => {
        this.touchCallback();
      });

      this.timePicker.options.onSet = (val, elem_val) => {
        this.changeValue(moment.duration(elem_val));
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
    if (!this.timePicker ) {
      return;
    }

    this.timePicker.val(this.innerValue ? `${this.innerValue.hours()}:${this.innerValue.minutes()}:${this.innerValue.seconds()}` : '');
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
