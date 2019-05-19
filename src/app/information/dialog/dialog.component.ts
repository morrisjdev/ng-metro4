import {Component, OnInit, ViewChild} from '@angular/core';
import * as metro4 from 'ng-metro4';
import {DialogService} from 'ng-metro4';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  @ViewChild('dialog') dialog: metro4.DialogComponent;

  title: string;
  message: string;
  test: string;

  dialogOpen = true;
  overlay = true;
  primary = true;
  width = 900;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  showDialog() {
    this.dialog.open().subscribe(console.log);

    setTimeout(() => {
      this.dialog.close();
    }, 5000);
  }

  showAlert() {
    this.dialogService.alert(this.title, this.message, 'bg-red', 'Oki doki');
  }

  showConfirm() {
    this.dialogService.confirm(this.title, this.message, 'Ja', 'Nein').subscribe(console.warn);
  }

  showPrompt() {
    this.dialogService.prompt(this.title, this.message, 'Speichern', 'Text').subscribe(console.warn);
  }

  showInfo() {
    const result = this.dialogService.info(this.message, { type: 'alert' });
    setTimeout(() => {
      result.setContent('Das ist ein test');
      setTimeout(() => {
        result.setType('success');
        setTimeout(() => {
          result.close();
        }, 1000);
      }, 500);
    }, 500);
  }
}
