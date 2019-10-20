import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';

@Component({
  selector: 'app-let',
  templateUrl: './let.component.html',
  styleUrls: ['./let.component.less']
})
export class LetComponent implements OnInit {

  content$;

  constructor() {
    this.content$ = timer(1000, 1000);
  }

  ngOnInit() {
  }

  increase() {
    (<any>this).model++;
  }
}
