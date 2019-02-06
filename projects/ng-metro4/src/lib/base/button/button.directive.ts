import {Directive, ElementRef, HostBinding, Inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {AccentType} from '../../helper/types';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: 'button[m4-button]'
})
export class ButtonDirective implements OnInit, OnChanges {
  @Input('btn-style') btnStyle: AccentType;
  @Input() outline: boolean;
  @Input() size: ''|'mini'|'small'|'large';
  @Input() rounded: boolean;
  @Input() shape: ''|'square'|'cycle';
  @Input() shadow: boolean;
  @Input() flat: boolean;
  @Input('special-btn') specialBtn: ''|'command'|'image'|'shortcut'|'ribbon';

  @Input() @HostBinding('type') type;
  @Input() class;

  @HostBinding('class') elementClass;

  constructor(private element: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) {

  }

  private createElement() {
    if (!this.type) {
      this.type = 'button';
    }

    const buttonClass = this.specialBtn === 'command' ? 'command-button' :
        this.specialBtn === 'image' ? 'image-button' :
          this.specialBtn === 'shortcut' ? 'shortcut' :
            this.specialBtn === 'ribbon' ? 'ribbon-button' : 'button';


    this.elementClass = `${this.class ? this.class + ' ' : ''}${buttonClass}` +
      `${this.btnStyle ? ' ' + this.btnStyle : ''}${this.outline ? ' outline' : ''}${this.size ? ' ' + this.size : ''}` +
      `${this.rounded ? ' rounded' : ''}${this.shape ? ' ' + this.shape : ''}${this.shadow ? ' drop-shadow' : ''}` +
      `${this.flat ? ' flat-button' : ''}`;
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
