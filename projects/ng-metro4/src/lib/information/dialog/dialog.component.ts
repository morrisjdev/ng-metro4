import {Component, ElementRef, ViewChild} from '@angular/core';

declare var $: any;

@Component({
  selector: 'm4-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @ViewChild('dialog') private dialog: ElementRef;
  @ViewChild('dialogActions') private dialogActions: ElementRef;

  public open() {
    $(this.dialogActions.nativeElement).find('button').one('click', () => {
      $(this.dialog.nativeElement).data('dialog').close();
    });

    (<any>window).Metro.dialog.open(this.dialog.nativeElement);
  }

  public close() {
    $(this.dialog.nativeElement).data('dialog').close();
  }
}
