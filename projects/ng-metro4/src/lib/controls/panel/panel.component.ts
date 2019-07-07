import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

declare var $: any;

@Component({
  selector: 'm4-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnChanges {
  @Input() width: number;
  @Input() height: number;
  @Input() title: string;
  @Input('title-icon') titleIcon: string;
  @Input() collapsible: boolean;
  @Input() collapsed: boolean;
  @Input() draggable: boolean;

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
    setTimeout(() => {
      const originalElement = $(this.panel.nativeElement);
      originalElement.hide();

      if (this.clonedElement) {
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone().show();
      originalElement.parent().append(this.clonedElement);

      this.panelObj = this.clonedElement.panel().data('panel');
    });
  }

  ngOnInit() {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
