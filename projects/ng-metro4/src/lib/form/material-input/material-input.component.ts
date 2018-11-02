import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ControlBase} from '../control-base';

declare var $: any;

@Component({
  selector: 'm4-material-input',
  templateUrl: './material-input.component.html',
  styleUrls: ['./material-input.component.css'],
  providers: [DefaultValueAccessor.get(MaterialInputComponent)]
})
export class MaterialInputComponent extends ControlBase<string> {
  @Input('type') type = 'text';
  @Input('placeholder') placeholder = '';
  @Input('label') label: string;
  @Input('informer') informer: string;
  @Input('icon') icon: string;
  @Input('cls-line') clsLine: string;
  @Input('cls-label') clsLabel: string;
  @Input('cls-informer') clsInformer: string;
  @Input('cls-icon') clsIcon: string;

  @ViewChild('input') private input: ElementRef;
  private materialInput: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.materialInput = this.clonedElement.materialinput().data('materialinput');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('keydown', (event) => {
      setTimeout(() => {
        this.changeValue(this.clonedElement.val());
      }, 0);
    });
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.materialInput.disable();
    } else {
      this.materialInput.enable();
    }
  }

  newValue(): void {
    if (!this.materialInput) {
      return;
    }

    this.disableUpdate = true;
    this.clonedElement.val(this.innerValue);
    this.disableUpdate = false;
  }

}
