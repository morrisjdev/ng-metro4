import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {

  customButtons = [
    {
      html: '<span class=\'mif-user\'></span>',
      cls: 'alert',
      onclick: 'alert(\'You press user button\')'
    },
    {
      html: '<span class=\'mif-user\'></span>',
      cls: 'alert',
      onclick: () => alert(this.model)
    },
    {
      html: '<span class=\'mif-user\'></span>',
      cls: 'alert',
      onclick: 'alert(\'You press user button\')'
    },
    {
      html: '<span class=\'mif-user\'></span>',
      cls: 'alert',
      onclick: 'alert(\'You press user button\')'
    }
  ];

  model = 'test';

  mmodel = 'test2';

  modelNumber = 12;

  constructor() { }

  ngOnInit() {
  }

  search(val: string) {
    alert(val);
  }
}
