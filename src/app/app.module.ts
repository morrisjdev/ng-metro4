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
import {NgMetro4Module} from 'ng-metro4';
import {LegalDisclosureComponent} from './shared/legal-disclosure/legal-disclosure.component';
import {PrivacyComponent} from './shared/privacy/privacy.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    LegalDisclosureComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    NgMetro4Module,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
