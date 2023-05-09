import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
   ) { }
   endpoint = environment.apiUrl

  // endpoint = 'http://127.0.0.1:8040'

              
  AddToast(formdata_toast: any ): Observable<any>{

    return this.http.post(this.endpoint + "/create", formdata_toast)

  }

  updateToast(id: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('Authorization');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(`${this.endpoint}/update/${id}`, formData, { headers });
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
