import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8000/api';
  
  constructor(private http : HttpClient) { }

  login(login: any) {
    return this.http.post(`${this.baseUrl}/login`, login);
  }
  register(register: any) {
    return this.http.post(`${this.baseUrl}/register`, register, {responseType: 'text'});
  }
  logout(userId : string) {
  return this.http.post(`${this.baseUrl}/logout`, userId, {responseType: 'text'});
  }
}
