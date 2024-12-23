import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isTokenNotValid(): boolean {
      return !this.isTokenValid();
  }

    isTokenValid() {
        const token = this.token;

        if(!token) {
            return false;
        }
        // decode the token
        const jwtHelper: JwtHelperService = new JwtHelperService();
        // check expiry date
        const isTokenExpired = jwtHelper.isTokenExpired(token);
        if (isTokenExpired) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    }

  constructor() { }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string
  }
}
