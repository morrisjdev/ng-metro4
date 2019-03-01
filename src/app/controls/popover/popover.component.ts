import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.less']
})
export class PopoverComponent implements OnInit {

  position = 'top';
  text = 'test';
  select: string[] = [];


  constructor() { }

  ngOnInit() {
  }

}
