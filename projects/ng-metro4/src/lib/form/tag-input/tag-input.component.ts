import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {ArrayHelper} from '../../helper/array-helper';
import {ControlBase} from '../control-base';

declare var $: any;

@Component({
  selector: 'm4-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css'],
  providers: [DefaultValueAccessor.get(TagInputComponent)]
})
export class TagInputComponent extends ControlBase<string[]> implements OnInit, ControlValueAccessor, OnChanges {
  @Input('tag-trigger') triggerKeyCodes: number[];
  @Input('max-tags') maxTagCount: number;
  @Input('random-color') randomTagColor: boolean;
  @Input('tag-separator') tagSeparator: string;

  @Input('cls-tag') tagClass: string;
  @Input('cls-tag-title') tagTitleClass: string;
  @Input('cls-tag-remover') tagRemoverClass: string;

  @ViewChild('taginput', { read: ViewContainerRef }) private input;
  private taginput: any;
  private disableUpdate = false;

  ngOnInit() {
    this.taginput = $(this.input.element.nativeElement).taginput().data('taginput');

    this.taginput.element.next('.input-wrapper').parent('div.tag-input').blur(() => {
      this.touchCallback();
    });

    this.taginput.options.onTag = (tag, val, vals) => {
      if (!this.disableUpdate && !ArrayHelper.sequenceEquals(vals, this.innerValue)) {
        this.changeValue(vals.slice(0));
      }
    };

    this.setTaginputProperties();
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.taginput.element.next('.input-wrapper').parent('div.tag-input').addClass('disabled');
    } else {
      this.taginput.element.next('.input-wrapper').parent('div.tag-input').removeClass('disabled');
    }
  }

  newValue(): void {
    this.disableUpdate = true;

    this.taginput.clear();

    if (!!this.innerValue && this.innerValue.length > 0) {
      this.taginput.val(this.innerValue);
    }

    this.disableUpdate = false;
  }

  private setTaginputProperties() {
    if (this.taginput) {
      if (this.triggerKeyCodes) {
        this.taginput.options.tagTrigger = this.triggerKeyCodes.join(',');
      }

      if (this.maxTagCount) {
        this.taginput.options.maxTags = this.maxTagCount;
      }

      if (this.randomTagColor) {
        this.taginput.options.randomColor = this.randomTagColor;
      }

      if (this.tagSeparator) {
        this.taginput.options.tagSeparator = this.tagSeparator;
      }

      if (this.tagClass) {
        this.taginput.options.clsTag = this.tagClass;
      }

      if (this.tagTitleClass) {
        this.taginput.options.clsTagTitle = this.tagTitleClass;
      }

      if (this.tagRemoverClass) {
        this.taginput.options.clsTagRemover = this.tagRemoverClass;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setTaginputProperties();
  }
}
