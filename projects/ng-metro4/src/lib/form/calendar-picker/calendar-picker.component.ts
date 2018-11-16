import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';

declare var $: any;

@Component({
  selector: 'm4-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.css'],
  providers: [DefaultValueAccessor.get(CalendarPickerComponent)]
})
export class CalendarPickerComponent extends ControlBase<Date> {

  // @Input('type') type = 'text';
  // @Input('default-value') defaultValue: any;
  // @Input('size') size: number;
  // @Input('prepend') prepend: string;
  // @Input('append') append: string;
  // @Input('clear-button') clearButton: boolean;
  // @Input('clear-button-icon') clearButtonIcon: string;
  // @Input('reveal-button') revealButton: boolean;
  // @Input('reveal-button-icon') revealButtonIcon: string;
  // @Input('custom-buttons') customButtons: { html: string, cls: string, onclick: string }[];
  //
  // @Input('cls-component') clsComponent: string;
  // @Input('cls-input') clsInput: string;
  // @Input('cls-prepend') clsPrepend: string;
  // @Input('cls-append') clsAppend: string;
  // @Input('cls-clear-button') clsClearButton: string;
  // @Input('cls-reveal-button') clsRevealButton: string;
  // @Input('cls-custom-button') clsCustomButton: string;

  @ViewChild('input') private input: ElementRef;
  private calendarPicker: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.calendarPicker = this.clonedElement.calendarpicker().data('calendarpicker');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('change', (event) => {
      setTimeout(() => {
        let newValue = this.calendarPicker.val().toLocaleDateString('en-US');
        console.log(newValue);
        this.changeValue(new Date(newValue));
      });
    });
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.calendarPicker.disable();
    } else {
      this.calendarPicker.enable();
    }
  }

  newValue(): void {
    if (!this.calendarPicker || !this.innerValue) {
      return;
    }

    this.calendarPicker.val(this.innerValue.toLocaleDateString('en-GB'));
  }

}
