import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'm4-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input('open') isOpen = false;
  @Input('width') width: string;
  @Input('overlay') overlay: boolean;
  @Input('overlay-color') overlayColor: string;
  @Input('overlay-alpha') overlayAlpha: string;
  @Input('overlay-click-close') overlayClickClose: boolean;

  @Input('data') data: any;

  @ViewChild('dialog', { static: true }) private dialog: ElementRef;
  dialogObj: any;

  private closeSubject$ = new Subject<any>();
  private classObserver: MutationObserver;

  constructor(private element: ElementRef) {}

  public open(): Observable<any> {
    this.dialogObj.open();
    return this.closeSubject$.pipe(take(1));
  }

  public close() {
    this.dialogObj.close();
  }

  ngAfterViewInit(): void {
    this.dialogObj = $(this.dialog.nativeElement).dialog({
      width: this.width,
      show: this.isOpen,
      overlay: this.overlay,
      overlayColor: this.overlayColor,
      overlayAlpha: this.overlayAlpha,
      overlayClickClose: this.overlayClickClose
    }).data('dialog');
    this.dialogObj.options.onClose = () => {
      this.closeSubject$.next(this.data);
    };

    this.observeClassValue();
  }

  private observeClassValue() {
    const classValueCallback = () => {
      const classValue = this.element.nativeElement.getAttribute('class');
      this.dialogObj.element.attr('class', `${classValue ? classValue + ' ' : ''}dialog`);
    };
    this.classObserver = new MutationObserver(classValueCallback);

    this.classObserver.observe(this.element.nativeElement, {
      attributeFilter: ['class'],
      attributes: true
    });

    classValueCallback();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dialogObj) {
      if (changes['isOpen']) {
        if (this.isOpen) {
          this.open();
        } else {
          this.close();
        }
      }

      if (changes['width']) {
        this.dialogObj.element.css('width', `${this.width}px`);
      }

      if (changes['overlay'] || changes['overlayColor'] || changes['overlayAlpha'] || changes['overlayClickClose']) {
        this.dialogObj.options.overlay = this.overlay;
        this.dialogObj.options.overlayColor = this.overlayColor;
        this.dialogObj.options.overlayAlpha = this.overlayAlpha;
        this.dialogObj.options.overlayClickClose = this.overlayClickClose;
      }
    }
  }

  ngOnDestroy(): void {
    this.dialogObj.element.remove();
    this.classObserver.disconnect();
  }
}
