import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from './credentials';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/finally';

@Injectable()
export class AuthService {

  private authenticated: boolean;
  private logoutMsg: boolean;
  private redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isLogoutMsg(): boolean {
    return this.logoutMsg;
  }

  authenticate(credentials: Credentials, callback: any): void {
    this.logoutMsg = false;

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get<Object>('user', {headers: headers})
      .pipe(catchError(_ => {
        return of(new Object());
      }))
      .subscribe(response => {
        if (response['id']) {
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });
  }

  logout(): void {
    this.http.post('logout', {}).finally(() => {
        this.authenticated = false;
        this.logoutMsg = true;
    }).subscribe();
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  setRedirectUrl(redirectUrl: string) {
    this.redirectUrl = redirectUrl;
  }

}