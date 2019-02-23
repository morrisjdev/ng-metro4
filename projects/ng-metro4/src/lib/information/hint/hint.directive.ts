import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {AttributeHelper} from '../../helper/attribute-helper';

declare var $: any;

@Directive({
  selector: '[m4-hint]'
})
export class HintDirective implements OnInit, OnChanges {
  @Input('m4-hint') hintText: string;
  @Input('hint-position') hintPosition: 'left'|'right'|'top'|'bottom';
  @Input('hint-hide') hintHide: number;
  @Input('cls-hint') clsHint: string;
  @Input('hint-offset') hintOffset: number;

  hintObj: any;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  private createElement() {
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-hint-text', this.hintText);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-hint-position', this.hintPosition);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-hint-hide', this.hintHide);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-cls-hint', this.clsHint);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-hint-offset', this.hintOffset);

    setTimeout(() => {
      if (!this.hintObj) {
        this.hintObj = $(this.element.nativeElement).hint().data('hint');
      } else {
        this.hintObj.options.hintText = this.hintText;
        this.hintObj.options.hintPosition = this.hintPosition;
        this.hintObj.options.hintHide = this.hintHide;
        this.hintObj.options.clsHint = this.clsHint;
        this.hintObj.options.hintOffset = this.hintOffset;
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
