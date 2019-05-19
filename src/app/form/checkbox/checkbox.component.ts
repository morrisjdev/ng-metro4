import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less']
})
export class CheckboxComponent implements OnInit {

  model = true;
  alert = true;

  group = [{ 'test': 1 }, 123, 'Test 2', [ 2, 3, 4 ]];

  listView = [];

  constructor() { }

  ngOnInit() {
  }

}
