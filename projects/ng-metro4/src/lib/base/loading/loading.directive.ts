import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[m4-loading]'
})
export class LoadingDirective implements OnInit, OnChanges {
  @Input('m4-loading') subscription: Subscription;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  private createElement() {
    if (this.subscription) {

    }
    // AttributeHelper.setAttribute(this.renderer, this.element, 'data-hint-text', this.hintText);
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
