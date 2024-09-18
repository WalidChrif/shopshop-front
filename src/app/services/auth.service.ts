import { Injectable } from '@angular/core';
import { Credentials } from '../common/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }

  login(credentials: Credentials) {
    console.log('Login:', credentials);
    
  }
  register(credentials: Credentials) {
    console.log('Register:', credentials);
    
  }
}
