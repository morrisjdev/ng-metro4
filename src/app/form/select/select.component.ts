import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  model = 't';

  modelArray: string[] = ['test'];

  data = {
    'morrisdev': 'Morris Janatzek',
    'test': 'Test Wert 1',
    'test2': 'Test Wert 2',
    'test3': {
      'test4': 'Das ist ein test',
      'test5': 'Das ist test5'
    }
  };

  dataArray = [
    't', 't2'
  ];

  constructor() { }

  ngOnInit() {
  }

}
