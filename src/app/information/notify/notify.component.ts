import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NotifyService} from 'ng-metro4';

declare var $: any;

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.less']
})
export class NotifyComponent implements OnInit {

  message = '';
  title = '';

  constructor(public notifyService: NotifyService) { }

  ngOnInit() {
  }

  notify() {
    this.notifyService.create('Notify message');
    this.notifyService.create('Notify message', 'Notify title');
  }

  notifyWait() {
    this.notifyService.create('Notify message', 'Notify title', { keepOpen: true }).subscribe(() => alert('closed'));
  }

  notifyOpen() {
    this.notifyService.create('Notify message', 'Notify title', { keepOpen: true });
  }

  notifyCustom() {
    this.notifyService.create('Notify message', 'Notify title', { keepOpen: true, cls: 'success', width: '400px' });
  }

  notifySetup() {
    this.notifyService.setup({
      duration: 2000,
      animation: 'easeInBounce',
      distance: '50px',
      timeout: 700,
      width: '400px'
    });
    this.notifyService.create('Notify message', 'Notify title');
    this.notifyService.reset();
  }
}
