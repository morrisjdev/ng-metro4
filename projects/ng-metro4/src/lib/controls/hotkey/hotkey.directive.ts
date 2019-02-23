import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {AttributeHelper} from '../../helper/attribute-helper';

declare var $: any;

@Directive({
  selector: '[m4-hotkey]'
})
export class HotkeyDirective implements OnInit, OnChanges {
  @Input('m4-hotkey') hotkey: string;

  private previousHandle: any;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  private createElement() {
    if (this.previousHandle) {
      $(document).off('keydown', this.previousHandle);
    }

    this.previousHandle = () => {
      $(this.element.nativeElement).click();
    };

    $(document).on('keydown', null, this.hotkey, this.previousHandle);
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
