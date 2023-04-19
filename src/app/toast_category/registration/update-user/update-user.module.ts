import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserRoutingModule } from './update-user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileRoutingModule } from '../../profile/profile-routing.module';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    UpdateUserRoutingModule

    
  ]
})
export class UpdateUserModule { }
