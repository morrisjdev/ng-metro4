import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent implements OnInit {

  model = 12;
  modelDecimal = 12;
  modelDecimalBig = 25;

  constructor() { }

  ngOnInit() {
  }

}
