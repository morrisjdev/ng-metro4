import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[m4-hint]'
})
export class HintDirective implements OnInit, OnChanges {
  @Input('m4-hint') hintText = '';
  @Input('hint-position') hintPosition: 'left'|'right'|'top'|'bottom' = 'top';
  @Input('hint-hide') hintHide = 5000;
  @Input('cls-hint') clsHint = '';
  @Input('hint-offset') hintOffset = 4;

  hintObj: any;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  private createElement() {
    this.renderer.setAttribute(this.element.nativeElement, 'data-hint-text', this.hintText);
    this.renderer.setAttribute(this.element.nativeElement, 'data-hint-position', this.hintPosition);
    this.renderer.setAttribute(this.element.nativeElement, 'data-hint-hide', '' + this.hintHide);
    this.renderer.setAttribute(this.element.nativeElement, 'data-cls-hint', this.clsHint);
    this.renderer.setAttribute(this.element.nativeElement, 'data-hint-offset', '' + this.hintOffset);

    setTimeout(() => {
      if (!this.hintObj) {
        this.hintObj = $(this.element.nativeElement).hint().data('hint');
      } else {
        this.hintObj.changeText();
      }
    }, 0);
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
