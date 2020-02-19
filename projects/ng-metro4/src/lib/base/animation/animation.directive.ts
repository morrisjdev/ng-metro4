import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AnimationType} from '../../helper/types';

declare var $: any;

@Directive({
  selector: '[m4-animation]'
})
export class AnimationDirective implements OnInit, OnChanges {
  @Input('m4-animation') animation: AnimationType;
  @Input('animation-hover') hover: boolean;

  private jElement: any;
  private oldClasses: string[] = [];

  constructor(private element: ElementRef) {
    this.jElement = $(this.element.nativeElement);
  }

  private createElement() {
    const newClasses = [ `ani-${this.hover ? 'hover-' : ''}${this.animation}` ];

    this.oldClasses.forEach(c => {
      this.jElement.removeClass(c);
    });
    newClasses.forEach(c => {
      this.jElement.addClass(c);
    });
    this.oldClasses = newClasses;
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
