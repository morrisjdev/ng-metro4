import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {TypeAlias} from '../../helper/type-alias';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css'],
  providers: [DefaultValueAccessor.get(TagInputComponent), TypeAlias.get(TagInputComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagInputComponent extends ControlBase<string[]> {

  @Input('random-color') randomColor: boolean;
  @Input('max-tags') maxTags: number;
  @Input('tag-trigger') tagTrigger: string[];
  @Input('clear-button') clearButton = true;
  @Input('clear-button-icon') clearButtonIcon: string;
  @Input('readonly') readonly = false;
  @Input('backspace') backspace = true;

  @Input('cls-tag') clsTag: string;
  @Input('cls-tag-title') clsTagTitle: string;
  @Input('cls-tag-remover') clsTagRemover: string;
  @Input('cls-clear-button') clsClearButton: string;
  @Input('cls-component') clsComponent: string;
  @Input('cls-input') clsInput: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private tagInput: any;
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

      this.tagInput = this.clonedElement.taginput().data('taginput');

      this.clonedElement.next('.input-wrapper').one('blur', () => {
        this.touchCallback();
      });

      this.tagInput.options.onTag = (tag, val, vals) => {
        this.changeValue(vals.slice(0));
      };

      complete();
    });

  }

  disable(disabled: boolean): void {
    if (this.tagInput) {
      const target = this.tagInput.element.parent('div.tag-input');

      if (target != null) {
        if (disabled) {
          target.addClass('disabled');
        } else {
          target.removeClass('disabled');
        }
      }
    }
  }

  newValue(): void {
    if (!this.tagInput) {
      return;
    }

    this.tagInput.clear();

    if (this.innerValue && this.innerValue.length > 0) {
      this.tagInput.val(this.innerValue);
    }
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
