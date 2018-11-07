import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [DefaultValueAccessor.get(FileInputComponent)]
})
export class FileInputComponent extends ControlBase<File | File[]> {
  @Input('multiple') multiple = false;

  @Input('prepend') prepend: string;
  @Input('button-title') buttonTitle: string;
  @Input('drop') drop = false;

  @Input('cls-component') clsComponent: string;
  @Input('cls-caption') clsCaption: string;
  @Input('cls-prepend') clsPrepend: string;
  @Input('cls-button') clsButton: string;

  @ViewChild('input') private input: ElementRef;
  private fileInput: any;
  private clonedElement: any;

  createControl() {
    const originalElement = $(this.input.nativeElement);
    originalElement.hide();

    if (this.clonedElement) {
      this.clonedElement.parent().remove();
    }

    this.clonedElement = originalElement.clone().show();
    originalElement.parent().append(this.clonedElement);

    this.fileInput = this.clonedElement.file().data('file');

    this.clonedElement.one('blur', () => {
      this.touchCallback();
    });

    this.clonedElement.on('change', (event) => {
      const fileList: FileList = this.clonedElement[0].files;

      if (this.multiple) {
        const files = [];

        for (let i = 0; i < fileList.length; i++) {
          files.push(fileList[i]);
        }

        this.changeValue(files);
      } else {
        this.changeValue(fileList[0]);
      }
    });
  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.fileInput.disable();
    } else {
      this.fileInput.enable();
    }
  }

  newValue(): void {
    if (!this.fileInput || this.drop || !this.innerValue) {
      return;
    }

    const name = this.innerValue instanceof Array ? (<File[]>this.innerValue).map(v => v.name).join(', ')
      : (<File>this.innerValue).name;

    this.clonedElement.parent().find('span.caption').html(name);
  }

}
