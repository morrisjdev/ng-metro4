import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css'],
  providers: [DefaultValueAccessor.get(TagInputComponent)]
})
export class TagInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('taginput', { read: ViewContainerRef }) private input;

  private innerValue: string[] = [];
  private taginput: any;

  private onChange: any = (_) => {};
  private onTouched: any = () => {};

  constructor() { }

  ngOnInit() {
    this.taginput = $(this.input.element.nativeElement).taginput().data('taginput');

    console.log(this.taginput);

    this.taginput.options.onTag = (tag, val, vals) => {
      if (vals.length <= 3) {
        return;
      }

      console.log(vals);
      this.onChange(vals);
    };
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.input.disable();
  }

  writeValue(values: string[]): void {
    if (!values || values.length === 0) {
      this.taginput.clear();
    } else {
      this.taginput.val(values);
    }
  }
}
