import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.less']
})
export class HintComponent implements OnInit {

  hint = 'test';
  position = 'bottom';

  constructor() { }

  ngOnInit() {
  }

}
