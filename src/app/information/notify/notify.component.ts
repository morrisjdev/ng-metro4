import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NotifyService} from 'ng-metro4';

declare var $: any;

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.less']
})
export class NotifyComponent implements AfterViewInit {

  message = '';
  title = '';

  constructor(private notifySerivce: NotifyService) { }

  ngAfterViewInit() {
    this.notifySerivce.setup({
      container: $('#test123'),
      animation: 'easeOutBounce'
    });
  }

  send() {
    this.notifySerivce.create(this.message, this.title);
  }
}
