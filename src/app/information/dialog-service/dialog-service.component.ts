import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService, M4FormGroup, M4FormControl, InputComponent, FileInputComponent} from 'ng-metro4';
import {last, takeUntil} from 'rxjs/operators';
import {Subscription, timer} from 'rxjs';
import {Validators} from '@angular/forms';
import {CustomDialogContentExampleComponent} from './custom-dialog-content-example/custom-dialog-content-example.component';

@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.less']
})
export class DialogServiceComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

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

  customDialog() {
    this.subscriptions.push(this.dialogService.show(CustomDialogContentExampleComponent, 'seeded with data', 'Custom dialog', 'Close', 'w-vw-75 alert')
      .pipe(last())
      .subscribe((data) => alert(data)));
  }

  promptForm() {
    const formGroup = new M4FormGroup('prompt', {
      name: new M4FormControl(FileInputComponent, null, [Validators.required], null, { read: 'text' })
    }, null, null);

    this.dialogService.formPrompt('Form prompt', formGroup)
      .subscribe((result) => alert(JSON.stringify(result)));
  }

  alertClose() {
    this.dialogService.alert('Alert close', 'Content').pipe(takeUntil(timer(2000))).subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }
}
