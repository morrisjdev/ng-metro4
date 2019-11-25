import {Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {AccentType, ButtonShapeType, ButtonSpecialType, SizeType} from '../../helper/types';

declare var $: any;

@Directive({
  selector: 'button[m4-button]',

})
export class ButtonDirective implements OnInit, OnChanges {
  @Input('btn-style') btnStyle: AccentType;
  @Input() outline: boolean;
  @Input() size: SizeType;
  @Input() rounded: boolean;
  @Input() shape: ButtonShapeType;
  @Input() shadow: boolean;
  @Input() flat: boolean;
  @Input('special-btn') specialBtn: ButtonSpecialType;

  @Input() @HostBinding('type') type;

  private jElement: any;
  private oldClasses: string[] = [];

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.jElement = $(this.element.nativeElement);
  }

  private createElement() {
    if (!this.type) {
      this.type = 'button';
    }

    const buttonClass = this.specialBtn === 'command' ? 'command-button' :
      this.specialBtn === 'image' ? 'image-button' :
        this.specialBtn === 'shortcut' ? 'shortcut' :
          this.specialBtn === 'ribbon' ? 'ribbon-button' :
            this.specialBtn === 'action' || this.specialBtn === 'multi-action' ? 'action-button' : 'button';

    const newClasses = [ buttonClass ];

    if (this.btnStyle) {
      newClasses.push(this.btnStyle);
    }

    if (this.outline) {
      newClasses.push('outline');
    }

    if (this.size) {
      newClasses.push(this.size);
    }

    if (this.rounded) {
      newClasses.push('rounded');
    }

    if (this.shape) {
      newClasses.push(this.shape);
    }

    if (this.shadow) {
      newClasses.push('drop-shadow');
    }

    if (this.flat) {
      newClasses.push('flat-button');
    }

    this.oldClasses.forEach(c => {
      this.jElement.removeClass(c);
    });
    newClasses.forEach(c => {
      this.jElement.addClass(c);
    });
    this.oldClasses = newClasses;
  }

  @HostListener('click')
  clickEvent() {
    if (this.specialBtn === 'multi-action') {
      this.jElement.toggleClass('active');
    }
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
