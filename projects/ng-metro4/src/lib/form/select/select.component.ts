import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [DefaultValueAccessor.get(SelectComponent)]
})
export class SelectComponent extends ControlBase<string|string[]> implements OnChanges {
  @Input('multiple') multiple = false;
  @Input('options') options: { [key: string]: string };

  /* Configuration */
  @Input('duration') duration: number;
  @Input('prepend') prepend: string;
  @Input('append') append: string;
  @Input('dropHeight') dropHeight: number;
  @Input('filter') filter: boolean;
  @Input('filterPlaceholder') filterPlaceholder: string;

  @Input('cls-select') clsSelect: string;
  @Input('cls-prepend') clsPrepend: string;
  @Input('cls-append') clsAppend: string;
  @Input('cls-option') clsOption: string;
  @Input('cls-option-group') clsOptionGroup: string;
  @Input('cls-drop-list') clsDropList: string;
  @Input('cls-selected-item') clsSelectedItem: string;
  @Input('cls-selected-item-remover') clsSelectedItemRemover: string;
  /* End Configuration */

  @ViewChild('input') private input: ElementRef;
  private select: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.clonedElement.html(this.clonedElement.find('[options]').html());
    this.select = this.clonedElement.select().data('select');

    this.select.options.onChange = (val) => {
      if (this.multiple) {
        this.changeValue(val.slice(0));
      } else {
        this.changeValue(val[0]);
      }
    };

    if (this.options) {
      this.select.data(this.options);
    }
  }

  disable(disabled: boolean) {
    if (disabled) {
      this.select.disable();
    } else {
      this.select.enabled();
    }
  }

  newValue() {
    if (!this.select) {
      return;
    }

    this.disableUpdate = true;

    if (this.multiple) {
      this.select.val(this.innerValue);
    } else {
      this.select.val([this.innerValue]);
    }

    this.disableUpdate = false;
  }
}
