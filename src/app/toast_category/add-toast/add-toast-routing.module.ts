import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponentComponent } from './components/add-component/add-component.component';

const routes: Routes = [
  {
  path:'',
  component: AddComponentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddToastRoutingModule { }
