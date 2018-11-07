import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.less']
})
export class KeypadComponent implements OnInit {

  open = false;
  position = 'left';
  model = 'test';
  modelNumber = 12;

  constructor() { }

  ngOnInit() {
  }

}
