import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  
  {
    path: "",
    loadChildren: () => import ('./toast_category/home/home.module').then(item => item.HomeModule)
  },
  {
    path: "add",
    loadChildren: () => import ('./toast_category/add-toast/add-toast.module').then(item => item.AddToastModule)
  },
  {
    path: "details",
    loadChildren: () => import ('./toast_category/detail-toast/detail-toast.module').then(item => item.DetailToastModule)
  },
  {
    path: "toast",
    loadChildren: () => import ('./toast_category/toast-list/toast-list.module').then(item => item.ToastListModule)
  },
  {
    path: "update",
    loadChildren: () => import ('./toast_category/update-toast/update-toast.module').then(item => item.UpdateToastModule)
  },
  {
    path: "login",
    loadChildren: () => import ('./toast_category/registration/login/login.module').then(item => item.LoginModule)
  },
  {
    path: "registration",
    loadChildren: () => import ('./toast_category/registration/registration/registration.module').then(item => item.RegistrationModule)
  },
  {
    path: "profile",
    loadChildren: () => import ('./toast_category/profile/profile.module').then(item => item.ProfileModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }