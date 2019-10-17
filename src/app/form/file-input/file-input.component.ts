import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.less']
})
export class FileInputComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  openFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      alert(reader.result);
    };

    reader.readAsText(file);
  }
}
