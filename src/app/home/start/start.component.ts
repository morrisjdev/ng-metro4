import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {

  angularJsonContent = `"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    ...
    "styles": [
      "node_modules/metro4/build/css/metro-all.min.css",
      "src/styles.less"
    ],
    ...
  },
}`;

  moduleImport = `@NgModule({
  declarations: [
  ...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMetro4Module,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`;

  constructor() { }

  ngOnInit() {
  }

}
