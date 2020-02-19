import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {finalize, startWith} from 'rxjs/operators';
import {FormBuilderComponent} from '../../form/form-builder/form-builder.component';
import {M4FormGroup} from '../../form/m4-form-group';
import {M4DialogDataEmitter, M4DialogDataInput} from './dialog-interfaces';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }

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
   * Show a prompt dialog that contains a form
   * @param title The title of the prompt
   * @param form The form group
   * @param submitBtnText The text of the Submit-Button
   * @param abortBtnText The text of the Abort-Button
   * @param placeholder The placeholder of the input
   * @param cls An optional css class for the dialog
   * @param submitBtnCls An optional css class for Submit-Button
   * @param abortBtnCls An optional css class for Abort-Button
   */
  public formPrompt<T = string>(title: string, form: M4FormGroup, submitBtnText?: string, abortBtnText?: string, placeholder?: string,
                cls?: string, submitBtnCls?: string, abortBtnCls?: string): Observable<T> {
    const componentRef: ComponentRef<FormBuilderComponent> = this.componentFactoryResolver.resolveComponentFactory(FormBuilderComponent).create(this.injector);
    componentRef.instance.formGroup = form;
    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    const subject$ = new Subject<T>();

    const options: DialogOptions = {
      title: title,
      content: 'content',
      actions: [
        {
          caption: abortBtnText ? abortBtnText : 'Abort',
          cls: abortBtnCls ? abortBtnCls : 'warning',
          onclick: () => {
            subject$.next(null);
            subject$.complete();
          }
        },
        {
          caption: submitBtnText ? submitBtnText : 'Submit',
          cls: (submitBtnCls ? submitBtnCls : 'success') + ' submit-btn',
          onclick: () => {
            subject$.next(form.value);
            subject$.complete();
          }
        }
      ],
      clsDialog: cls
    };

    const promptObj: any = this.create(options);
    promptObj.find('.dialog-content').empty().append(domElement);

    const formStateSubscription = form.statusChanges.pipe(startWith(form.status)).subscribe((valid: 'VALID'|'INVALID') => {
      const submitBtn = promptObj.find('.dialog-actions button.submit-btn');

      if (valid === 'VALID') {
        submitBtn.removeAttr('disabled');
      } else {
        submitBtn.attr('disabled', 'disabled');
      }
    });

    return subject$.asObservable().pipe(
      finalize(() => {
        this.close(promptObj);
        componentRef.destroy();
        formStateSubscription.unsubscribe();
      })
    );
  }

  /**
   * Show a dialog that contains a component
   * @param component The component class to render (add to entryComponents of a module)
   * @param dialogData Data to pass to the new component instance
   * @param title The title of the dialog
   * @param closeBtnText Custom text for the close button
   * @param cls Custom dialog class (accent, size etc.)
   * @param closeBtnCls Custom close button class
   */
  public show<TOutput = null>(component: new () => any, dialogData?: any, title?: string, closeBtnText?: string, cls?: string, closeBtnCls?: string): Observable<TOutput> {
    const componentRef: ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

    if (!!dialogData) {
      (<M4DialogDataInput<TOutput>>componentRef.instance).dialogDataInput = dialogData;
    }

    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    const subject$ = new Subject<TOutput>();

    let dialogDataSubscription: Subscription;

    if (!!(<M4DialogDataEmitter<TOutput>>componentRef.instance).dialogDataEmitter) {
      dialogDataSubscription = (<M4DialogDataEmitter<TOutput>>componentRef.instance).dialogDataEmitter.subscribe((data) => {
         subject$.next(data);
      });
    }

    const options: DialogOptions = {
      title: title,
      content: 'content',
      actions: [
        {
          caption: closeBtnText ? closeBtnText : 'Submit',
          cls: (closeBtnCls ? closeBtnCls : 'success') + ' submit-btn',
          onclick: () => {
            subject$.complete();
          }
        }
      ],
      clsDialog: cls
    };

    const dialogObj: any = this.create(options);
    dialogObj.find('.dialog-content').empty().append(domElement);

    return subject$.asObservable().pipe(
      finalize(() => {
        if (dialogDataSubscription) {
          dialogDataSubscription.unsubscribe();
        }

        this.close(dialogObj);
        componentRef.destroy();
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
