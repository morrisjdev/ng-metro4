import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContainerComponent} from './container/container.component';
import {LetComponent} from './let/let.component';
import {GridComponent} from './grid/grid.component';
import {LoadingComponent} from './loading/loading.component';
import {IconComponent} from './icon/icon.component';
import {ButtonComponent} from './button/button.component';


const routes: Routes = [
  { path: 'container', component: ContainerComponent },
  { path: 'grid', component: GridComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'icon', component: IconComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'let', component: LetComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
