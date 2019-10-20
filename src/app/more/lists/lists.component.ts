import { Component, OnInit } from '@angular/core';
import {Lists} from 'ng-metro4';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.less']
})
export class ListsComponent implements OnInit {

  lists = Lists;

  constructor() { }

  ngOnInit() {
  }

}
