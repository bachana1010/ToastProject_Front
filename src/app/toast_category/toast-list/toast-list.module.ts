import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastListRoutingModule } from './toast-list-routing.module';
import { CategoryComponentComponent } from './components/category-component/category-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    CategoryComponentComponent
  ],
  imports: [
    CommonModule,
    ToastListRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    MatChipsModule,
    
  ]
})
export class ToastListModule { }



