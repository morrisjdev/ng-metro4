import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  model = 'test';

  modelArray: string[] = ['test1'];

  constructor() { }

  ngOnInit() {
  }

}
