import {AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, ViewChild} from '@angular/core';
import {PopoverDirective} from './popover.directive';
import {asapScheduler} from 'rxjs';

declare var $: any;
declare var Metro: any;

@Component({
  selector: 'm4-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent implements AfterViewInit {
  @ContentChild(PopoverDirective, { static: true }) popover: PopoverDirective;
  @ViewChild('popoverContent', { static: true }) content: ElementRef;

  ngAfterViewInit(): void {
    asapScheduler.schedule(() => {
      this.popover.popoverObj.options.onPopoverShow = () => {
        if (this.popover.popoverObj.popover) {
          $(this.content.nativeElement).children().appendTo(this.popover.popoverObj.popover.find('.popover-content'));

          this.popover.popoverObj.size = Metro.utils.hiddenElementSize(this.popover.popoverObj.popover);
          this.popover.popoverObj.setPosition();
        }
      };

      this.popover.popoverObj.options.onPopoverHide = () => {
        asapScheduler.schedule(() => {
          if (this.popover.popoverObj && this.popover.popoverObj.popover) {
            this.popover.popoverObj.popover.find('.popover-content').children().appendTo($(this.content.nativeElement));
          }
        }, 300);
      };
    }, 1);
  }
}
