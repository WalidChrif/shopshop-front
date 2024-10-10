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
    return {
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
  // exchangeCodeForToken(code: string) {
  //   const url = `http://${this.keycloak.server}/admin/realms/${this.keycloak.realm}/protocol/openid-connect/token`
  //   const body = new URLSearchParams();
  //   body.set('grant_type', 'authorization_code');
  //   body.set('code', code);
  //   body.set('redirect_uri', this.keycloak.redirectUri); // Your redirect URI
  //   body.set('client_id', this.keycloak.clientId); // Your client ID
  //   return this.http.post(url, body.toString(), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   });
  // }
  exchangeCode(code : string){
    return this.http.post('http://localhost:8000/api/exchange-code', code);
  }
}
