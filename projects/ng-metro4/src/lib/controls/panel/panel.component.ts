import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {asapScheduler} from 'rxjs';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements OnInit, OnChanges {
  @Input() width: number;
  @Input() height: number;
  @Input() title: string;
  @Input('title-icon') titleIcon: string;
  @Input() collapsible: boolean;
  @Input() collapsed: boolean;
  @Input('custom-buttons') customButtons: { html: string, cls: string, onclick: string }[];

  @Input('cls-panel') clsPanel: string;
  @Input('cls-title') clsTitle: string;
  @Input('cls-title-caption') clsTitleCaption: string;
  @Input('cls-title-icon') clsTitleIcon: string;
  @Input('cls-content') clsContent: string;
  @Input('cls-collapse-toggle') clsCollapseToggle: string;

  @ViewChild('panel', { static: true }) panel: ElementRef;
  private clonedElement: any;
  panelObj: any;

  constructor() { }

  createElement() {
    asapScheduler.schedule(() => {
      const originalElement = $(this.panel.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.children().appendTo(originalElement);
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone();
      originalElement.children().appendTo(this.clonedElement);
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.panelObj = this.clonedElement.panel({
        customButtons: this.customButtons
      }).data('panel');
    });
  }

  ngOnInit() {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
