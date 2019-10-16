import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StartComponent} from './start/start.component';
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [
    StartComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
