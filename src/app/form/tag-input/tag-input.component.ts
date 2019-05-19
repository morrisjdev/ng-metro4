import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.less']
})
export class TagInputComponent implements OnInit {

  tagClass = 'bg-red';

  alert = true;
  model: string[] = ['test1', 'test2', 'test3'];

  constructor() { }

  ngOnInit() {
  }

}
