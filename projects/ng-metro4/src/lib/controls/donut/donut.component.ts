import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    asapScheduler.schedule(() => {
      const originalElement = $(this.donut.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.donutObj = this.clonedElement.donut().data('donut');
    });
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
