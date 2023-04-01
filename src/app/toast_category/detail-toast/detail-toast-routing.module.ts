import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponentComponent } from './components/detail-component/detail-component.component';

const routes: Routes = [
  {
    path:'',
    component: DetailComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailToastRoutingModule { }
