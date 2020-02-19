import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {PositionBaseType, ThinType} from '../../helper/types';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
  providers: [DefaultValueAccessor.get(SliderComponent), TypeAlias.get(SliderComponent)],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent extends ControlBase<number> {

  @Input('min') min: number;
  @Input('max') max: number;
  @Input('show-min-max') showMinMax: boolean;
  @Input('accuracy') accuracy: number;
  @Input('buffer') buffer: number;
  @Input('hint') hint: boolean;
  @Input('hint-always') hintAlways: boolean;
  @Input('hint-position') hintPosition: PositionBaseType;
  @Input('hint-mask') hintMask: string;
  @Input('vertical') vertical: boolean;
  @Input('size') size: number;

  @Input('thin') thin: ThinType;
  @Input('cycle-marker') cycleMarker: boolean;

  @Input('cls-slider') clsSlider: string;
  @Input('cls-backside') clsBackside: string;
  @Input('cls-complete') clsComplete: string;
  @Input('cls-buffer') clsBuffer: string;
  @Input('cls-marker') clsMarker: string;
  @Input('cls-hint') clsHint: string;
  @Input('cls-min-max') clsMinMax: string;
  @Input('cls-min') clsMin: string;
  @Input('cls-max') clsMax: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private slider: any;
  private clonedElement: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.input.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.parent().parent().find('.slider-min-max').remove();
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.slider = this.clonedElement.slider().data('slider');

      this.clonedElement.parent().find('button.marker').one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('change', () => {
        asapScheduler.schedule(() => {
          this.changeValue(+this.clonedElement.val());
        });
      });

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
    if (!this.slider) {
      return;
    }

    this.slider.val(this.innerValue);
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
