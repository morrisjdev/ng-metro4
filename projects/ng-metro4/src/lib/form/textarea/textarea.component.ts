import {Component, ElementRef, Input, ViewChild} from '@angular/core';
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
  @Input('default-value') defaultValue: string;
  @Input('prepend') prepend: string;
  @Input('append') append: string;
  @Input('clear-button') clearButton: boolean;
  @Input('clear-button-icon') clearButtonIcon: string;
  @Input('auto-size') autoSize: boolean;

  @Input('cls-component') clsComponent: string;
  @Input('cls-textarea') clsTextarea: string;
  @Input('cls-prepend') clsPrepend: string;
  @Input('cls-append') clsAppend: string;

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

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('keydown change', (event) => {
      setTimeout(() => {
        this.changeValue(this.clonedElement.val());
      }, 0);
    });
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

    this.clonedElement.val(this.innerValue);
    this.textareaObj.resize();
  }

}
