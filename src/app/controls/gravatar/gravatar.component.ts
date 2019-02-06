import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravatar',
  templateUrl: './gravatar.component.html',
  styleUrls: ['./gravatar.component.less']
})
export class GravatarComponent implements OnInit {

  email: string;
  size = 80;

  constructor() { }

  ngOnInit() {
  }

}
