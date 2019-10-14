import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {asapScheduler} from 'rxjs';
import {ProgressTypeType} from '../../helper/types';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent implements OnInit, OnChanges {
  @Input() value: number;
  @Input() buffer: number;
  @Input() small: boolean;
  @Input() type: ProgressTypeType;

  @Input('cls-back') clsBack: string;
  @Input('cls-bar') clsBar: string;
  @Input('cls-buffer') clsBuffer: string;

  @ViewChild('progress', { static: true }) private progress: ElementRef;
  private clonedElement: any;
  private progressObj: any;

  constructor() { }

  private createControl() {
    asapScheduler.schedule(() => {
      const originalElement = $(this.progress.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.progressObj = this.clonedElement.progress().data('progress');
    });
  }

  ngOnInit() {
    this.createControl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (Object.keys(changes).filter(c => c !== 'value' && c !== 'buffer').length > 0) {
      this.createControl();
    } else {
      if (this.progressObj) {
        this.progressObj.val(this.value);
        this.progressObj.buff(this.buffer);
      }
    }
  }

}
