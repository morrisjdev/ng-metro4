import {Component, EventEmitter, OnInit} from '@angular/core';
import {M4DialogDataEmitter, M4DialogDataInput} from 'ng-metro4';

@Component({
  selector: 'app-custom-dialog-content-example',
  templateUrl: './custom-dialog-content-example.component.html',
  styleUrls: ['./custom-dialog-content-example.component.less']
})
export class CustomDialogContentExampleComponent implements OnInit, M4DialogDataEmitter<string>, M4DialogDataInput<string> {

  constructor() { }

  model: string;

  dialogDataEmitter = new EventEmitter<string>();
  dialogDataInput: string;

  ngOnInit() {
    this.model = this.dialogDataInput;
  }

}
