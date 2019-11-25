import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {
  options = [
    {title: 'Test 1 with object', value: { test: 'This is the first test' }, dataTemplate: '<span class=\'mif-amazon icon\'></span> $1'},
    {
      groupName: 'Test Gruppe',
      options: [
        {title: 'Test 2 only number', value: 28, dataTemplate: '<span class=\'mif-amazon icon\'></span> $1'}
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
