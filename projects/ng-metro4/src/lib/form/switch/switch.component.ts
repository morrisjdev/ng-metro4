import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {TypeAlias} from '../../helper/type-alias';
import {PositionHorizontalType} from '../../helper/types';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.less'],
  providers: [DefaultValueAccessor.get(SwitchComponent), TypeAlias.get(SwitchComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SwitchComponent extends ControlBase<boolean> {

  @Input('material') material: boolean;
  @Input('readonly') readonly = false;
  @Input('caption') caption: string;
  @Input('caption-position') captionPosition: PositionHorizontalType;

  @Input('cls-switch') clsSwitch: string;
  @Input('cls-caption') clsCaption: string;
  @Input('cls-check') clsCheck: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private clonedElement: any;
  private switch: any;

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

      this.switch = this.clonedElement.switch().data('switch');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('change', () => {
        this.changeValue(this.clonedElement.prop('checked'));
      });

      complete();
    });

  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.clonedElement.attr('disabled', 'disabled');
      this.switch.disable();
    } else {
      this.clonedElement.removeAttr('disabled');
      this.switch.enable();
    }
  }

  newValue(): void {
    if (!this.switch) {
      return;
    }

    this.clonedElement.prop('checked', this.innerValue);
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
