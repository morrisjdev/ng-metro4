import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotkey',
  templateUrl: './hotkey.component.html',
  styleUrls: ['./hotkey.component.less']
})
export class HotkeyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  alert() {
    alert('hotkey clicked');
  }

}
