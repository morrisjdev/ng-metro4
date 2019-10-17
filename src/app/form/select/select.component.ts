import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {
  options = [
    {title: 'Das ist ein test', value: 12, dataTemplate: '<span class=\'mif-amazon icon\'></span> $1'},
    {
      groupName: 'Test Gruppe',
      options: [
        {title: 'Das ist ein test', value: 13, dataTemplate: '<span class=\'mif-amazon icon\'></span> $1'}
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
