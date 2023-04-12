
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// ...

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // ...

  constructor(private http: HttpClient) {}

  // ...

  getToastById(id: number): Observable<any> {
    return this.http.get<any>(`/http://127.0.0.1:8040/update/${id}`);
  }

  updateToast(id: number, toastData: any): Observable<any> {
    return this.http.put<any>(`/api/toasts/${id}`, toastData);
  }
}
