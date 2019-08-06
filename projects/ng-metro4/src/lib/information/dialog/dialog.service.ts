import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

declare var $: any;

interface DialogOptions {
  title?: string;
  content?: string;
  actions?: { caption: string, cls: string, onclick: () => void }[];
  actionsAlign?: 'left'|'right';
  defaultAction?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayAlpha?: number;
  overlayClickClose?: boolean;
  width?: number;
  closeAction?: boolean;
  clsDialog?: string;
  clsTitle?: string;
  clsContent?: string;
  clsAction?: string;
  clsDefaultAction?: string;
  autoHide?: number;
  removeOnClose?: boolean;
  show?: boolean;
}

interface InfoboxOptions {
  type?: 'default'|'success'|'info'|'alert'|'warning';
  width?: number;
  height?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayAlpha?: string;
  autoHide?: number;
  removeOnClose?: boolean;
  closeButton?: boolean;
  clsBox?: string;
  clsBoxContent?: string;
  clsOverlay?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  public create(options: DialogOptions): any {
    return (<any>window).Metro.dialog.create(options);
  }

  public alert(title: string, message: string, cls?: string, okBtnText?: string, okBtnCls?: string): Observable<void> {
    const subject$ = new Subject<void>();

    const options: DialogOptions = {
      title: title,
      content: message,
      clsDialog: cls,
      overlayClickClose: true
    };

    if (okBtnText) {
      options.actions = [{
        caption: okBtnText,
        cls: (okBtnCls ? okBtnCls : '') + ' js-dialog-close',
        onclick: () => {
          subject$.next();
          subject$.complete();
        }
      }];
    }

    this.create(options);

    return subject$.asObservable();
  }

  public confirm(title: string, message: string, yesBtnText?: string, noBtnText?: string,
                 cls?: string, yesBtnCls?: string, noBtnCls?: string): Observable<boolean> {
    const subject$ = new Subject<boolean>();

    const options: DialogOptions = {
      title: title,
      content: message,
      actions: [
        {
          caption: yesBtnText ? yesBtnText : 'Yes',
          cls: (yesBtnCls ? yesBtnCls : 'success') + ' js-dialog-close',
          onclick: () => {
            subject$.next(true);
            subject$.complete();
          }
        },
        {
          caption: noBtnText ? noBtnText : 'No',
          cls: (noBtnCls ? noBtnCls : 'alert') + ' js-dialog-close',
          onclick: () => {
            subject$.next(false);
            subject$.complete();
          }
        }
      ],
      clsDialog: cls
    };

    this.create(options);

    return subject$.asObservable();
  }

  public prompt(title: string, message: string, submitBtnText?: string, placeholder?: string,
                cls?: string, submitBtnCls?: string): Observable<string> {
    const subject$ = new Subject<string>();

    const options: DialogOptions = {
      title: title,
      content: (message ? message : '') +
                `<br><br><input data-role="input" type="text" placeholder="${placeholder ? placeholder : ''}" />`,
      actions: [
        {
          caption: submitBtnText ? submitBtnText : 'Submit',
          cls: (submitBtnCls ? submitBtnCls : 'success') + ' js-dialog-close',
          onclick: () => {
            subject$.next(value);
            subject$.complete();
          }
        }
      ],
      clsDialog: cls
    };

    const promptObj: any = this.create(options);
    const input = promptObj.find('input');

    let value = '';
    input.on('change', () => {
      value = input.val();
    });

    return subject$.asObservable();
  }

  public info(content: string, options?: InfoboxOptions): { setContent: (content: string) => void;
    setType: (type: 'default'|'success'|'info'|'alert'|'warning') => void; close: () => void } {
    return (<any>window).Metro.infobox.create(content, '', options).data('infobox');
  }
}
