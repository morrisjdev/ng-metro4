import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';

declare var $: any;

export interface DialogOptions {
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

export interface InfoboxOptions {
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

@Injectable()
export class DialogService {

  constructor() { }

  /**
   * Create a custom dialog
   * @param options The options of the dialog
   */
  public create(options: DialogOptions): any {
    return (<any>window).Metro.dialog.create(options);
  }

  /**
   * Close a created dialog
   * @param dialogObj The object returned by the create method
   */
  public close(dialogObj: any): any {
    return (<any>window).Metro.dialog.close(dialogObj);
  }

  /**
   * Shows an alert dialog
   * @param title The title of the dialog
   * @param message The message of the dialog
   * @param cls Optional css classes
   * @param okBtnText The text of the OK-Button
   * @param okBtnCls An optional css class for the OK-Button
   */
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

    const alertObj = this.create(options);

    return subject$.asObservable().pipe(
      finalize(() => {
        this.close(alertObj);
      })
    );
  }

  /**
   * Shows a confirm dialog
   * @param title The title of the confirm
   * @param message The message of the confirm
   * @param yesBtnText The text for the Yes-Button
   * @param noBtnText The text for the No-Button
   * @param cls An optional css class for the dialog
   * @param yesBtnCls An optional css class for the Yes-Button
   * @param noBtnCls An optional css class for the No-Button
   */
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

    const confirmObj = this.create(options);

    return subject$.asObservable().pipe(
      finalize(() => {
        this.close(confirmObj);
      })
    );
  }

  /**
   * Show a prompt dialog
   * @param title The title of the prompt
   * @param message The message of the prompt
   * @param submitBtnText The text of the Submit-Button
   * @param placeholder The placeholder of the input
   * @param cls An optional css class for the dialog
   * @param submitBtnCls An optional css class for Submit-Button
   * @param inputCls An optional css class for the input
   */
  public prompt(title: string, message: string, submitBtnText?: string, placeholder?: string,
                cls?: string, submitBtnCls?: string, inputCls?: string): Observable<string> {
    const subject$ = new Subject<string>();

    const options: DialogOptions = {
      title: title,
      content: (message ? message : '') +
                `<br><input data-role="input" type="text" class="${inputCls}" placeholder="${placeholder ? placeholder : ''}" />`,
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

    return subject$.asObservable().pipe(
      finalize(() => {
        this.close(promptObj);
      })
    );
  }

  /**
   * Show an info dialog
   * @param content The content of the info
   * @param options Options for info
   */
  public info(content: string, options?: InfoboxOptions): { setContent: (content: string) => void;
    setType: (type: 'default'|'success'|'info'|'alert'|'warning') => void; close: () => void } {
    return (<any>window).Metro.infobox.create(content, '', options).data('infobox');
  }
}
