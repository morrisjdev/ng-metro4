import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import powershell from 'highlight.js/lib/languages/powershell';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HighlightModule} from 'ngx-highlightjs';
import {SharedModule} from './shared/shared.module';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'html', func: xml},
    {name: 'ps', func: powershell },
    {name: 'json', func: json },
    {name: 'css', func: css },
  ];
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
