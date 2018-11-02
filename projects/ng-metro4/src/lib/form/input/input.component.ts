import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DefaultValueAccessor.get(InputComponent)]
})
export class InputComponent extends ControlBase<string> {

  /* Configuration */
  @Input('random-color') randomColor: boolean;
  /* End Configuration */

  @ViewChild('input') private input: ElementRef;
  private inputObj: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.inputObj = this.clonedElement.input().data('input');

    // this.inputObj.element.next('.input-wrapper').parent('div.tag-input').on('blur', () => {
    //   this.touchCallback();
    // });

    this.clonedElement.on('change', (val) => {
      console.log(val);
    });

    this.inputObj.options.onHistoryChange = (val, history, index) => {
      // this.changeValue(vals.slice(0));
      console.log(val);
    };
  }

  disable(disabled: boolean): void {
    // if (disabled) {
    //   this.inputObj.element.next('.input-wrapper').parent('div.tag-input').addClass('disabled');
    // } else {
    //   this.inputObj.element.next('.input-wrapper').parent('div.tag-input').removeClass('disabled');
    // }
  }

  newValue(): void {
    if (!this.inputObj) {
      return;
    }

    this.disableUpdate = true;
    this.clonedElement.val(this.innerValue);
    this.inputObj.setHistory(this.innerValue);
    this.disableUpdate = false;
  }
}
