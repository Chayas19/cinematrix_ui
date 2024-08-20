
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinematrixsevicesService {
  
RegisterAPI = " https://localhost:7133/api/UserAccount/register";

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<string> {
    
    return this.http.post<string>(this.RegisterAPI, userData, { responseType: 'text' as 'json' });
  }
}
