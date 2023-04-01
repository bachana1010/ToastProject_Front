import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponentComponent } from './component/update-component/update-component.component';

const routes: Routes = [
  {
    path:'',
    component: UpdateComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateToastRoutingModule { }
