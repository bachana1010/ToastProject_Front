import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'http://127.0.0.1:8040'
  constructor(private http: HttpClient,
              private router: Router,
              ) { }
  
              
  registerUser(user: any ): Observable<any>{

    return this.http.post(this.endpoint + "/registration", user)

  }

  loginUser(user: any): Observable<any>{
    return this.http.post(this.endpoint + "/login", user)
  }

  logoutUser(){
     localStorage.removeItem("Authorization")
     localStorage.removeItem("ID"); // Add this line

     this.router.navigate(["login"])
  }

  loggedIn(){
    return !!localStorage.getItem('Authorization')
  }
  
  getInformation(requestOptions: any ){
    return this.http.post(this.endpoint + "/me", requestOptions)


  }
  Update_user(requestOptions: any, form:any){
    return this.http.post(this.endpoint + "/update", form, requestOptions)


  }
  
  me_user(requestOptions: any){
    return this.http.get(this.endpoint + "/me", requestOptions)


  }


}
