import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailToastRoutingModule } from './detail-toast-routing.module';
import { DetailComponentComponent } from './components/detail-component/detail-component.component';


@NgModule({
  declarations: [
    DetailComponentComponent
  ],
  imports: [
    CommonModule,
    DetailToastRoutingModule
  ]
})
export class DetailToastModule { }
