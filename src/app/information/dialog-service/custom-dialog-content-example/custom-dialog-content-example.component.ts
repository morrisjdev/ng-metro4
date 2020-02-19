import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {DialogService, M4DialogDataEmitter, M4DialogDataInput} from 'ng-metro4';
import {last} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-custom-dialog-content-example',
  templateUrl: './custom-dialog-content-example.component.html',
  styleUrls: ['./custom-dialog-content-example.component.less']
})
export class CustomDialogContentExampleComponent implements OnInit, M4DialogDataEmitter<string>, M4DialogDataInput<string>, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private dialogService: DialogService) { }

  model: string;

  dialogDataEmitter = new EventEmitter<string>();
  dialogDataInput: string;

  ngOnInit() {
    this.model = this.dialogDataInput;
  }

  showDialog() {
    this.subscriptions.push(this.dialogService.show(CustomDialogContentExampleComponent, 'Called from dialog', 'Custom dialog called from a dialog', 'Close', 'success')
      .pipe(last())
      .subscribe((data) => alert(data)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }
}
