import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.less']
})
export class TextareaComponent implements OnInit {

  model = 'test';

  constructor() { }

  ngOnInit() {
  }

}
