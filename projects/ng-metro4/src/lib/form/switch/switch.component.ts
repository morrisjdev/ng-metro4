import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';
import {TypeAlias} from '../../helper/type-alias';

declare var $: any;

@Component({
  selector: 'm4-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  providers: [DefaultValueAccessor.get(SwitchComponent), TypeAlias.get(SwitchComponent)]
})
export class SwitchComponent extends ControlBase<boolean> {
  @Input('material') material: boolean;
  @Input('caption') caption: string;
  @Input('caption-position') captionPosition: 'left'|'right';

  @Input('cls-switch') clsSwitch: string;
  @Input('cls-caption') clsCaption: string;
  @Input('cls-check') clsCheck: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private clonedElement: any;
  private switch: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.input.nativeElement);
      originalElement.hide();

      if (this.clonedElement) {
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone().show();
      originalElement.parent().append(this.clonedElement);

      this.switch = this.clonedElement.switch().data('switch');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('change', (event) => {
        this.changeValue(this.clonedElement.prop('checked'));
      });

      complete();
    });

  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.clonedElement.attr('disabled', '');
      this.switch.disable();
    } else {
      this.clonedElement.attr('disabled', null);
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
