import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {TypeAlias} from '../../helper/type-alias';

declare var $: any;

@Component({
  selector: 'm4-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css'],
  providers: [DefaultValueAccessor.get(TagInputComponent), TypeAlias.get(TagInputComponent)]
})
export class TagInputComponent extends ControlBase<string[]> {
  @Input('random-color') randomColor: boolean;
  @Input('max-tags') maxTags: number;
  @Input('tag-separator') tagSeparator: string;
  @Input('tag-trigger') tagTrigger: number[];

  @Input('cls-tag') clsTag: string;
  @Input('cls-tag-title') clsTagTitle: string;
  @Input('cls-tag-remover') clsTagRemover: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private tagInput: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.tagInput = this.clonedElement.taginput().data('taginput');

    this.clonedElement.next('.input-wrapper').one('blur', () => {
      this.touchCallback();
    });

    this.tagInput.options.onTag = (tag, val, vals) => {
      this.changeValue(vals.slice(0));
    };
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.tagInput.element.next('.input-wrapper').parent('div.tag-input').addClass('disabled');
    } else {
      this.tagInput.element.next('.input-wrapper').parent('div.tag-input').removeClass('disabled');
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
