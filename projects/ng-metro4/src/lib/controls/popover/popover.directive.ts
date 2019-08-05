import {Directive, ElementRef, Inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AttributeHelper} from '../../helper/attribute-helper';
import {asapScheduler} from 'rxjs';
import {PopoverTriggerType, PositionBaseType} from '../../helper/types';

declare var $: any;

@Directive({
  selector: '[m4-popover]'
})
export class PopoverDirective implements OnInit, OnChanges {
  @Input('m4-popover') popoverText: string;
  @Input('popover-position') popoverPosition: PositionBaseType = 'top';
  @Input('popover-trigger') popoverTrigger: PopoverTriggerType;
  @Input('popover-hide') popoverHide: number;
  @Input('popover-close-button') closeBtn: boolean;
  @Input('cls-popover') clsPopover: number;

  popoverObj: any;

  constructor(private element: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) {

  }

  private createElement() {
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-popover-text', this.popoverText);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-popover-position', this.popoverPosition);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-popover-trigger', this.popoverTrigger);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-popover-hide', this.popoverHide);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-cls-popover', this.clsPopover);
    AttributeHelper.setAttribute(this.renderer, this.element, 'data-close-button', this.closeBtn);

    asapScheduler.schedule(() => {
      if (!this.popoverObj) {
        this.popoverObj = $(this.element.nativeElement).popover().data('popover');
      } else {
        this.popoverObj.options.popoverText = this.popoverText;
        this.popoverObj.options.popoverPosition = this.popoverPosition;
        this.popoverObj.options.popoverTrigger = this.popoverTrigger;
        this.popoverObj.options.popoverHide = this.popoverHide;
        this.popoverObj.options.closeButton = this.closeBtn;
        this.popoverObj.options.clsPopover = this.clsPopover;
      }
    });
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }

}
