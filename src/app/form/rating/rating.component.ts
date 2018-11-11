import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.less']
})
export class RatingComponent implements OnInit {

  model = 3.7;

  modelChar = 'D';

  modelDec = 0.3;

  constructor() { }

  ngOnInit() {
  }

}
