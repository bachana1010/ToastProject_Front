import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponentComponent } from './components/category-component/category-component.component';

const routes: Routes = [
  {
    path:'',
    component: CategoryComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToastListRoutingModule { }
