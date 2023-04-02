import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyToastRoutingModule } from './my-toast-routing.module';

import { MainComponent } from './main/main.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { ReversePipe } from './reverse.pipe';


@NgModule({
  declarations: [
    MainComponent,
    ReversePipe

  ],
  imports: [
    CommonModule,
    MyToastRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    MatChipsModule,
  ]
  
})
export class MyToastModule { }
