import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {ObjectHelper} from '../../helper/object-helper';
import {FileReadModeType} from '../../helper/types';

declare var $: any;

export interface FileEntry {
  file: File;
  content: any;
}

@Component({
  selector: 'm4-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.less'],
  providers: [DefaultValueAccessor.get(FileInputComponent), TypeAlias.get(FileInputComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FileInputComponent extends ControlBase<File | File[] | FileEntry | FileEntry[]> {

  @Input('multiple') multiple = false;
  @Input('accept') accept = '';
  @Input('read') read: FileReadModeType = '';

  @Input('prepend') prepend: string;
  @Input('button-title') buttonTitle: string;
  @Input('info-text') infoText: string;
  @Input('drop') drop = false;

  @Input('cls-component') clsComponent: string;
  @Input('cls-caption') clsCaption: string;
  @Input('cls-prepend') clsPrepend: string;
  @Input('cls-button') clsButton: string;

  @ViewChild('input', {static: true}) private input: ElementRef;
  private fileInput: any;
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

      this.fileInput = this.clonedElement.file().data('file');

      if (this.drop) {
        if (this.buttonTitle) {
          const captionElement = this.clonedElement.closest('label.drop-zone').find('span.caption');
          captionElement.html(this.buttonTitle);
        }

        if (this.infoText) {
          this.updateInfoText();
        }
      }

      this.fileInput.options.onSelect = (files) => {
        if (this.multiple) {
          const result: File[] = [];

          for (let i = 0; i < files.length; i++) {
            result.push(files[i]);
          }

          if (this.read) {
            this.readFiles(files);
          } else {
            this.changeValue(result);
          }
        } else {
          if (this.read) {
            this.readFiles(files);
          } else {
            this.changeValue(files[0]);
          }
        }

        if (this.drop && this.infoText) {
          this.updateInfoText();
        }
      };

      this.clonedElement.one('blur', () => {
        this.touchCallback();
      });

      complete();
    });

  }

  readFiles(files: File[]) {
    const fileLoadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const loadPromise = new Promise<FileEntry>((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve({content: reader.result, file: file});
        };

        switch (this.read) {
          case 'arrayBuffer':
            reader.readAsArrayBuffer(file);
            break;
          case 'binaryString':
            reader.readAsBinaryString(file);
            break;
          case 'dataUrl':
            reader.readAsDataURL(file);
            break;
          case 'text':
          default:
            reader.readAsText(file);
            break;
        }
      });

      fileLoadPromises.push(loadPromise);
    }

    Promise.all(fileLoadPromises).then((fileEntries: FileEntry[]) => {
      if (this.multiple) {
        this.changeValue(fileEntries);
      } else {
        this.changeValue(fileEntries[0]);
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
    if (!this.fileInput || this.drop || this.read || !this.innerValue) {
      return;
    }

    let name;

    if (this.innerValue instanceof Array) {
      name = (<any>this.innerValue).map((v: File | FileEntry) => {
        if (v instanceof File) {
          return v.name;
        } else {
          return v.file.name;
        }
      }).join(', ');
    } else {
      name = this.innerValue instanceof File ? this.innerValue.name : this.innerValue.file.name;
    }

    this.clonedElement.parent().find('span.caption').html(name);
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

  private updateInfoText() {
    const infoTextContent = this.infoText
      .split('{0}')
      .join(this.innerValue instanceof Array ? `${this.innerValue.length}` : this.innerValue ? '1' : '0');

    const infoTextElement = this.clonedElement.closest('label.drop-zone').find('span.files');
    infoTextElement.html(infoTextContent);
  }

}
