import {Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[m4-hotkey]'
})
export class HotkeyDirective implements OnInit, OnChanges, OnDestroy {
  @Input('m4-hotkey') hotkey: string;
  @Output() hotkeyClick = new EventEmitter();

  private previousKey: string;

  constructor() {}

  private createElement() {
    this.unregister();
    this.previousKey = this.hotkey;

    $('body').hotkey(this.hotkey, () => {
      this.hotkeyClick.emit();
    });
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }

  private unregister() {
    if (this.previousKey) {
      $('body').off('keyup', null, {ns: 'hotkey-method-' + this.previousKey});
    }
  }

  ngOnDestroy(): void {
    this.unregister();
  }
}
