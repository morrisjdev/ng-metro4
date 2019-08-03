import {Component, OnInit} from '@angular/core';
import {NEVER, Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {
  disabled = false;
  neverEnding: Subscription;
  loading: Subscription;

  constructor() {
    this.neverEnding = NEVER.subscribe();
  }

  ngOnInit() {
  }

  startLoading() {
    this.loading = timer(1000).subscribe();
  }
}
