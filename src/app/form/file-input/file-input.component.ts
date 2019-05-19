import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.less']
})
export class FileInputComponent implements OnInit {

  prepend: string;
  model: File;
  modelArr: File[];
  alert = true;

  constructor() { }

  ngOnInit() {
  }

  openFile() {
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(reader.result);
    };

    reader.readAsText(this.model);
  }
}
