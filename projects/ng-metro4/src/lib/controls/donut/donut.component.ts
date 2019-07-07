import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

declare var $: any;

@Component({
  selector: 'm4-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit, OnChanges {
  @Input() value: number;
  @Input() size: number;
  @Input() radius: number;
  @Input() hole: number;
  @Input() background: string;
  @Input() color: string;
  @Input() stroke: string;
  @Input() fill: string;
  @Input('font-size') fontSize: number;
  @Input() total: number;
  @Input() caption: string;
  @Input() animate: number;
  @Input('show-value') showValue: boolean;

  @ViewChild('donut', { static: true }) private donut: ElementRef;
  private clonedElement: any;
  private donutObj: any;

  constructor() { }

  private createControl() {
    setTimeout(() => {
      const originalElement = $(this.donut.nativeElement);
      originalElement.hide();

      if (this.clonedElement) {
        this.clonedElement.remove();
      }

      this.clonedElement = originalElement.clone().show();
      originalElement.parent().append(this.clonedElement);

      this.donutObj = this.clonedElement.donut().data('donut');
    }, 0);
  }

  ngOnInit() {
    this.createControl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (Object.keys(changes).filter(c => c !== 'value').length > 0) {
      this.createControl();
    } else {
      if (this.donutObj) {
        this.donutObj.val(this.value);
      }
    }
  }
}
