import {Directive, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ColorType} from '../../helper/types';

@Directive({
  selector: 'span[m4Icon]'
})
export class IconDirective implements OnInit, OnChanges {
  @Input() m4Icon: string;
  @Input() size: 0|1|2|3|4|5 = 0;
  @Input() color: ColorType;

  @Input() class;

  @HostBinding('class') elementClass;

  constructor() {
  }

  private createElement() {
    const sizeClass = this.size === 0 ? '' : this.size === 1 ? ' mif-lg' : ' mif-' + this.size + 'x';
    this.elementClass = `${this.class ? this.class + ' ' : ''}mif-${this.m4Icon}${sizeClass}${this.color ? ' fg-' + this.color : ''}`;
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }

}
