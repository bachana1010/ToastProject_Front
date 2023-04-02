import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main_component/header/header/header.component';
import {CookieService} from 'ngx-cookie-service'
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { NgEventBus } from 'ng-event-bus';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import { DialogComponent } from './dialog/dialog.component';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatDialogModule

  ],
  providers: [CookieService, AuthGuard, AuthService, NgEventBus],
  bootstrap: [AppComponent]
})
export class AppModule { }
