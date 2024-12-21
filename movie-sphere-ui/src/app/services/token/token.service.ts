import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  get name(): string {
    const token = this.token;
    if (!token) {
      return '';
    }
    return this.jwtHelper.decodeToken(token).fullName || '';
  }

  isAdmin(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    const authorities = decodedToken?.authorities || [];
    return authorities.includes('ADMIN');
  }
}
