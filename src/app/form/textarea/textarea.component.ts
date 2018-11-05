import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.less']
})
export class TextareaComponent implements OnInit {

  prepend = '';

  model = 'test';

  constructor() { }

  ngOnInit() {
  }

}
