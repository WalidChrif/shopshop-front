import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  keycloak = environment.keycloak;
  constructor(private http: HttpClient) {}

  parseToken(token: any) {    
    const accessToken = token.access_token;    
    const tokenParts = accessToken.split('.');
    const payload = atob(tokenParts[1]); // Decode the payload part (2nd part of the JWT)
    const decodedPayload = JSON.parse(payload);

    // console.log('Decoded Token:', decodedPayload);
    return this.extractUserInfo(decodedPayload, token);
  }

  extractUserInfo(decodedPayload: any, token: any) {
    const newUser =  {
      id: decodedPayload.sub,
      email: decodedPayload.email,
      firstName: decodedPayload.given_name,
      lastName: decodedPayload.family_name,
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      role: decodedPayload.realm_access?.roles.includes('ADMIN')
        ? 'ADMIN'
        : 'CUSTOMER',
    };
    return newUser;
  }
  isTokenExpired(accessToken: string): boolean {
    const expiry = JSON.parse(atob(accessToken.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  refreshToken(refreshToken: string) {
    return this.http.post('http://localhost:8000/api/refresh-token', {
      refreshToken,
    });
  }
  exchangeCode(code : string){
    return this.http.post('http://localhost:8000/api/exchange-code', code);
  }
}
