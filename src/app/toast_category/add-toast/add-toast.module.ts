import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddToastRoutingModule } from './add-toast-routing.module';
import { AddComponentComponent } from './components/add-component/add-component.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AddComponentComponent
  ],
  imports: [
    CommonModule,
    AddToastRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,
    // BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatIconModule,

  ]
})
export class AddToastModule { }
