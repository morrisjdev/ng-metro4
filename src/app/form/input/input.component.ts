import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {

  model = 'test';

  mmodel = 'test2';

  modelNumber = 12;

  constructor() { }

  ngOnInit() {
  }

}
