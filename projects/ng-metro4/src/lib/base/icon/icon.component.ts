import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {ColorType, IconType} from '../../helper/types';
import {AttributeHelper} from '../../helper/attribute-helper';

@Component({
  selector: 'm4-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class IconComponent implements OnInit, OnChanges, OnDestroy {
  @Input() icon: IconType;
  @Input() size: 0|1|2|3|4|5 = 0;
  @Input() color: ColorType;

  @Input() class: string;

  elementClass: string;
  private classObserver: MutationObserver;

  constructor(@Optional() private mainElement: ElementRef) { }

  private createElement() {
    const sizeClass = this.size === 0 ? '' : this.size === 1 ? ' mif-lg' : ' mif-' + this.size + 'x';
    this.elementClass = `${this.class ? this.class + ' ' : ''}mif-${this.icon}${sizeClass}${this.color ? ' fg-' + this.color : ''}`;
  }

  ngOnInit(): void {
    this.classObserver = AttributeHelper.createObserver(this.mainElement, (newClasses, oldClasses) => {
      this.class = newClasses.join(' ');
      this.createElement();
    });

    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }

  ngOnDestroy(): void {
    if (this.classObserver) {
      this.classObserver.disconnect();
    }
  }
}
