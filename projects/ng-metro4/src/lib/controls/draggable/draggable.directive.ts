import {Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';
import {asapScheduler} from 'rxjs';

declare var $: any;

export interface DragPosition {
  x: number;
  y: number;
}

@Directive({
  selector: '[m4-draggable]'
})
export class DraggableDirective implements OnInit, OnChanges, OnDestroy {
  @Input('m4-draggable') dragElement: string;
  @Input('drag-area') dragArea: string;

  @Output() dragStart = new EventEmitter<DragPosition>();
  @Output() dragStop = new EventEmitter<DragPosition>();
  @Output() dragMove = new EventEmitter<DragPosition>();

  private draggableData;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  private createElement() {
    asapScheduler.schedule(() => {
      if (this.draggableData) {
        if (this.dragArea) {
          this.draggableData.elem.remove();
        }

        this.draggableData.destroy();
      }

      const draggableOptions: any = {
        onDragStart: (position: DragPosition) => {
          this.dragStart.emit(position);
        },
        onDragStop: (position: DragPosition) => {
          this.dragStop.emit(position);
        },
        onDragMove: (position: DragPosition) => {
          this.dragMove.emit(position);
        }
      };

      if (this.dragElement) {
        draggableOptions.dragElement = this.dragElement;
      }

      if (this.dragArea) {
        draggableOptions.dragArea = this.dragArea;
      }

      this.draggableData = $(this.element.nativeElement).draggable(draggableOptions).data('draggable');
    });
  }

  public setPosition(position: DragPosition) {
    if (this.draggableData) {
      $(this.draggableData.elem).css({
        left: position.x + 'px',
        top: position.y + 'px'
      });
    }
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }

  ngOnDestroy(): void {
    $(this.element.nativeElement).remove();
  }
}
