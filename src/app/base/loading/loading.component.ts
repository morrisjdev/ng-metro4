import {Component, OnInit} from '@angular/core';
import {NEVER, Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {
  loading: Subscription;

  constructor() { }

  ngOnInit() {
  }

  startLoading() {
    this.loading = timer(1000).subscribe();
  }
}
