import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ColorType} from '../../helper/types';

@Component({
  selector: 'm4-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit, OnChanges {
  @Input() icon: string;
  @Input() size: 0|1|2|3|4|5 = 0;
  @Input() color: ColorType;

  @Input() class: string;

  elementClass: string;

  constructor() { }

  private createElement() {
    const sizeClass = this.size === 0 ? '' : this.size === 1 ? ' mif-lg' : ' mif-' + this.size + 'x';
    this.elementClass = `${this.class ? this.class + ' ' : ''}mif-${this.icon}${sizeClass}${this.color ? ' fg-' + this.color : ''}`;
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }

}
