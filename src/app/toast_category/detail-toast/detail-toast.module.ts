import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailToastRoutingModule } from './detail-toast-routing.module';
import { DetailComponentComponent } from './components/detail-component/detail-component.component';
import { ReactiveFormsModule } from '@angular/forms';


// import { ToastListRoutingModule } from './toast-list-routing.module';
// import { CategoryComponentComponent } from './components/category-component/category-component.component';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    DetailComponentComponent
  ],
  imports: [
    CommonModule,
    DetailToastRoutingModule,
    ReactiveFormsModule,
    MatChipsModule
  ]
})
export class DetailToastModule { }
