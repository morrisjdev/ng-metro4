import {Component, OnInit, ViewChild} from '@angular/core';
import * as metro4 from 'ng-metro4';
import {DialogService} from 'ng-metro4';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  @ViewChild('dialog', { static: true }) dialog: metro4.DialogComponent;

  title: string;
  message: string;
  test: string;

  dialogOpen = false;
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
}
