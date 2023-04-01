import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
   ) { }
  endpoint = 'http://127.0.0.1:8040'

              
  AddToast(formdata_toast: any ): Observable<any>{

    return this.http.post(this.endpoint + "/create", formdata_toast)

  }

  
  setLocalStorage(information: any, name: any){
    return localStorage.setItem(name, information)
  }

  getLocalStorage(name:any){
    return localStorage.getItem(name)
  }

  toast_list(requestOptions: any){
    return this.http.get(this.endpoint + "/list", requestOptions)


  }

  
}
