import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateToastComponent } from './update-toast/update-toast.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateToastComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToastUpdateRoutingModule { }
