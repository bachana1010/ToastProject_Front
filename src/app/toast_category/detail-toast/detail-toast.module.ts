import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailToastRoutingModule } from './detail-toast-routing.module';
import { DetailComponentComponent } from './components/detail-component/detail-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


// import { ToastListRoutingModule } from './toast-list-routing.module';
// import { CategoryComponentComponent } from './components/category-component/category-component.component';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    DetailComponentComponent
  ],
  imports: [
    CommonModule,
    DetailToastRoutingModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
    // BrowserAnimationsModule,

  ]
})
export class DetailToastModule { }
