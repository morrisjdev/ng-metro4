import { Component, OnInit } from '@angular/core';
import {ToastService} from 'ng-metro4';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.less']
})
export class ToastComponent implements OnInit {

  color = 'success';
  message: string;

  constructor(private toastService: ToastService) { }

  ngOnInit() {

  }

  send() {
    this.toastService.create(this.message, {
      cls: this.color
    });
  }
}
