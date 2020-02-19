import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';
import {InputType} from '../../helper/types';

declare var $: any;

@Component({
  selector: 'm4-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DefaultValueAccessor.get(InputComponent), TypeAlias.get(InputComponent)],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends ControlBase<string|number> {
  @Output('search-button-click') searchButtonClick = new EventEmitter<string|number>();

  @Input('readonly') readonly = false;
  @Input('placeholder') placeholder = '';
  @Input('type') type: InputType = 'text';
  @Input('default-value') defaultValue: any;
  @Input('size') size: number;
  @Input('prepend') prepend: string;
  @Input('append') append: string;
  @Input('clear-button') clearButton: boolean;
  @Input('clear-button-icon') clearButtonIcon: string;
  @Input('reveal-button') revealButton: boolean;
  @Input('reveal-button-icon') revealButtonIcon: string;
  @Input('custom-buttons') customButtons: { html: string, cls: string, onclick: string }[] = [];
  @Input('search-button') searchButton: boolean;
  @Input('search-button-icon') searchButtonIcon: string;
  @Input('autocomplete') autocomplete: string[];
  @Input('autocomplete-list-height') autocompleteListHeight: number;

  @Input('cls-component') clsComponent: string;
  @Input('cls-input') clsInput: string;
  @Input('cls-prepend') clsPrepend: string;
  @Input('cls-append') clsAppend: string;
  @Input('cls-clear-button') clsClearButton: string;
  @Input('cls-reveal-button') clsRevealButton: string;
  @Input('cls-custom-button') clsCustomButton: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private inputObj: any;
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

      this.inputObj = this.clonedElement.input({
        customButtons: this.customButtons,
        onSearchButtonClick: (val) => this.searchButtonClick.emit(val)
      }).data('input');

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      this.clonedElement.on('keydown change', (event) => {
        asapScheduler.schedule(() => {
          let newValue = this.clonedElement.val();

          if (this.type === 'number') {
            newValue = +newValue;
          }

          this.changeValue(newValue);
        }, 1);
      });

      complete();
    });
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.inputObj.disable();
    } else {
      this.inputObj.enable();
    }
  }

  newValue(): void {
    if (!this.inputObj) {
      return;
    }

    this.clonedElement.val(this.innerValue);
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
