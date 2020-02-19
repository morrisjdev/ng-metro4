import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [DefaultValueAccessor.get(TextareaComponent), TypeAlias.get(TextareaComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends ControlBase<string> {

  @Input('placeholder') placeholder = '';
  @Input('readonly') readonly = false;
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

  @ViewChild('textarea', { static: true }) private textarea: ElementRef;
  private textareaObj: any;
  private clonedElement: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.textarea.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.textareaObj = this.clonedElement.textarea().data('textarea');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('keydown change', () => {
        asapScheduler.schedule(() => {
          this.changeValue(this.clonedElement.val());
        });
      });

      complete();
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
