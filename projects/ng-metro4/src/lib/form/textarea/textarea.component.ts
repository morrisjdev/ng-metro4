import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [DefaultValueAccessor.get(TextareaComponent)]
})
export class TextareaComponent extends ControlBase<string> {

  @ViewChild('textarea') private textarea: ElementRef;
  private textareaObj: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.textarea.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.textareaObj = this.clonedElement.textarea().data('textarea');

    console.log(this.textareaObj);

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.textareaObj.options.onChange = (val, length) => {
      this.changeValue(val);
    };
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.textareaObj.disable();
    } else {
      this.textareaObj.enable();
    }
  }

  newValue(): void {
    if (!this.textareaObj) {
      return;
    }

    this.disableUpdate = true;
    this.clonedElement.val(this.innerValue);
    this.textareaObj.resize();
    this.disableUpdate = false;
  }

}
