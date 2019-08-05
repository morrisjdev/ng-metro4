import {Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[m4-hotkey]'
})
export class HotkeyDirective implements OnInit, OnChanges {
  @Input('m4-hotkey') hotkey: string;
  @Output() hotkeyClick = new EventEmitter();

  private previousHandle: any;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  private createElement() {
    if (this.previousHandle) {
      $(document).unbind('keydown', this.previousHandle);
    }

    this.previousHandle = () => {
      this.hotkeyClick.emit();
    };

    $(document).bind('keydown', this.hotkey, this.previousHandle);
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
