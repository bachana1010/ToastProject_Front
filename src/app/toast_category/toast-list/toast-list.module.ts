import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastListRoutingModule } from './toast-list-routing.module';
import { CategoryComponentComponent } from './components/category-component/category-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';

// Add these imports
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Add these imports
import { MatDialogModule, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DialogComponent } from 'src/app/dialog/dialog.component';
// import { DialogComponent } from './dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Add this


@NgModule({
  declarations: [
    CategoryComponentComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ToastListRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    MatChipsModule,
    MatDialogModule, // Add this
    MatButtonModule, // Add this
    MatIconModule, // Add this
    MatDialogModule, // Add this
    MatDialogModule
    


    
  ],
  providers: [ // Add this
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: {} },
],

})
export class ToastListModule { 
  
}



