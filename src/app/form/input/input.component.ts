import {AfterViewInit, Component, ContentChildren, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ControlBase} from 'ng-metro4';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit, AfterViewInit {

  @ViewChildren(ControlBase) controls: QueryList<ControlBase<any>>;

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
  alert = true;

  mmodel = 'test2';

  modelNumber = 12;

  prepend: string;

  constructor() { }

  ngOnInit() {
  }

  search(val: string) {
    alert(val);
  }

  classTest($event: string) {
    this.alert = $event.length > 5;
  }

  ngAfterViewInit(): void {
    console.log(this.controls);
  }
}
