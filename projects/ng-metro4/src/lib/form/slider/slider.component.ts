import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [DefaultValueAccessor.get(SliderComponent)]
})
export class SliderComponent extends ControlBase<number> {
  @Input('min') min: number;
  @Input('max') max: number;
  @Input('show-min-max') showMinMax: boolean;
  @Input('accuracy') accuracy: number;
  @Input('buffer') buffer: number;
  @Input('hint') hint: boolean;
  @Input('hint-always') hintAlways: boolean;
  @Input('hint-position') hintPosition: 'top'|'left'|'right'|'bottom';
  @Input('hint-mask') hintMask: string;
  @Input('vertical') vertical: boolean;
  @Input('size') size: number;

  @Input('thin') thin: 'thin'|'ultra-thin';
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

  @ViewChild('input') private input: ElementRef;
  private slider: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.slider = this.clonedElement.slider().data('slider');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('change', (event) => {
      setTimeout(() => {
        this.changeValue(+this.clonedElement.val());
      }, 0);
    });
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.slider.disable();
    } else {
      this.slider.enable();
    }
  }

  newValue(): void {
    if (!this.slider) {
      return;
    }

    this.slider.val(this.innerValue);
  }

}
