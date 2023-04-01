import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NgEventBus } from 'ng-event-bus';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public User: any = ''
  requestOptions = {}
  

  constructor( public authservice: AuthService,
    private eventBus: NgEventBus,
    private httpClient: HttpClient,

    ) { 
      
    }
    

  ngOnInit(): void { 

    this.onSubmitUpdate()
    this.eventBus.on('loginSuccessfully').subscribe((meta) => {
      this.User = meta?.data?.username
      console.log("es", meta?.data?.username, this.User)
    });
    
 
  }

  onSubmitUpdate(){
    this.User = localStorage.getItem("username")

  }


 
  
}
