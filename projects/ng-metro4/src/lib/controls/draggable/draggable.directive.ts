import {Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[m4-draggable]'
})
export class DraggableDirective implements OnInit, OnChanges, OnDestroy {
  @Input('m4-draggable') dragElement: string;
  @Input('drag-area') dragArea: string;

  @Output() dragStart = new EventEmitter<{ x: number, y: number }>();
  @Output() dragStop = new EventEmitter<{ x: number, y: number }>();
  @Output() dragMove = new EventEmitter<{ x: number, y: number }>();

  private draggableData;

  constructor(private element: ElementRef, private renderer: Renderer2) {}



  private createElement() {
    const draggableOptions: any = {
      onDragStart: (position, element) => {
        console.log(position, element);
      }
    };

    if (this.dragElement) {
      draggableOptions.dragElement = this.dragElement;
    }

    if (this.dragArea) {
      draggableOptions.dragArea = this.dragArea;
    }

    this.draggableData = $(this.element.nativeElement).draggable(draggableOptions).data('draggable');

    console.log(this.draggableData);
    // $(document).hotkey(this.hotkey, () => {
    //   this.hotkeyClick.emit();
    // });
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }

  ngOnDestroy(): void {

  }
}
