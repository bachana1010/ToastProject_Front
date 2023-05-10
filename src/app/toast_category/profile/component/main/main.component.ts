import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  endpoint = environment.apiUrl

  userNameprofile: any
  totalViews: any
  totalLikes: any
  numberOfToast: any


  constructor(  private dataservie: DataService,
                private httpClient : HttpClient

    ) { }

  ngOnInit(): void {
    this.userNameprofile = this.dataservie.getLocalStorage("username")
    this.getInformation()
    
  }

  getInformation(): void {

    const token = localStorage.getItem('Authorization');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
    this.httpClient.get<any>(`${this.endpoint}/MyToast`, {headers })
    .subscribe(response => {
      this.totalLikes = response.total_likes
      this.totalViews = response.total_views
      this.numberOfToast = response.number_of_toasts
    });

  }

  



}
