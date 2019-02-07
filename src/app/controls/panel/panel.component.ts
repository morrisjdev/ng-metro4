import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {

  width: number;
  height: number;
  draggable: boolean;
  collapsible: boolean;
  collapsed: boolean;

  title: string;
  icon: string;

  constructor() { }

  ngOnInit() {
  }

}
