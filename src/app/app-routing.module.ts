import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LegalDisclosureComponent} from './shared/legal-disclosure/legal-disclosure.component';
import {PrivacyComponent} from './shared/privacy/privacy.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'base', loadChildren: () => import('./base/base.module').then(m => m.BaseModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'controls', loadChildren: () => import('./controls/controls.module').then(m => m.ControlsModule) },
  { path: 'information', loadChildren: () => import('./information/information.module').then(m => m.InformationModule) },
  { path: 'more', loadChildren: () => import('./more/more.module').then(m => m.MoreModule) },

  { path: 'legal-details', component: LegalDisclosureComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
