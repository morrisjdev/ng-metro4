import {Component, OnInit} from '@angular/core';
import {DialogService} from 'ng-metro4';
import {takeUntil} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.less']
})
export class DialogServiceComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  alert() {
    this.dialogService.alert('Basic alert', 'Warning!');
  }

  confirm() {
    this.dialogService.confirm('Basic confirm', 'Are you sure?');
  }

  prompt() {
    this.dialogService.prompt('Basic prompt', 'Enter value');
  }

  info() {
    this.dialogService.info('Basic info');
  }

  ngOnInit(): void { }

  confirmWait() {
    this.dialogService.confirm('Confirm wait', 'Are you sure?')
      .subscribe((result) => alert(result));
  }

  promptWait() {
    this.dialogService.prompt('Prompt wait', 'Input')
      .subscribe((result) => alert(result));
  }

  alertClose() {
    this.dialogService.alert('Alert close', 'Content').pipe(takeUntil(timer(2000))).subscribe();
  }
}
