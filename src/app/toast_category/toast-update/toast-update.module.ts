import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastUpdateRoutingModule } from './toast-update-routing.module';
import { UpdateToastComponent } from './update-toast/update-toast.component';
import { FormControl } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    UpdateToastComponent
  ],
  imports: [
    CommonModule,
    ToastUpdateRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSnackBarModule

  ]
})
export class ToastUpdateModule { }
