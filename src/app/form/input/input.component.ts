import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  search(val: string) {
    alert(val);
  }
}
