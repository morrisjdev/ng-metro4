import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  alert = true;
  prepend: string;

  model = 't';
  model2 = null;

  modelArray: string[] = ['test'];
  modelArray2: string[] = ['test'];
  modelArray3: string[] = [];

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
    't', 't2', 't3'
  ];

  complexOptionsArray = [
    { title: 'Das ist ein test', value: 12, dataTemplate: '<span class=\'mif-amazon icon\'></span> $1' },
    { groupName: 'Test Gruppe',
      options: [
        { title: 'Das ist ein test', value: 13, dataTemplate: '<span class=\'mif-amazon icon\'></span> $1' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
