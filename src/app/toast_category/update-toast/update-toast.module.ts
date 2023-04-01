import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateToastRoutingModule } from './update-toast-routing.module';
import { UpdateComponentComponent } from './component/update-component/update-component.component';


@NgModule({
  declarations: [
    UpdateComponentComponent
  ],
  imports: [
    CommonModule,
    UpdateToastRoutingModule
  ]
})
export class UpdateToastModule { }
