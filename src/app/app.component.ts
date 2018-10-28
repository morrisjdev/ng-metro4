import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'metro4-demo';

  public tagInputModel: string[] = ['test1', 'test2', 'test3'];
}
