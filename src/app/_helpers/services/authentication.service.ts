import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { JwTAuthenticationResponseInterface } from '../../authentication/models/authentication.model';
import { Router } from '@angular/router';
import { User } from '@app/features/human-resources/models/user.model';
// import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  public erroMessage!: string;

  public onLogOn(
    email: string,
    password: string
  ): Observable<JwTAuthenticationResponseInterface> {
    return this._http.post<JwTAuthenticationResponseInterface>(
      `${environment.apiUrl}/${environment.jwtLogin}`,
      JSON.stringify({ email, password }),
      this.httpOptions
    );
  }

  public onRefreshPage(): Observable<JwTAuthenticationResponseInterface> {
    const input = {
      jwtToken: this.getToken(),
      refreshToken: this.getRefreshToken,
    };
    console.log('This refresh function has been called');
    return this._http.post<JwTAuthenticationResponseInterface>(
      `${environment.apiUrl}/${environment.jwtRefresh}`,
      { input },
      this.httpOptions
    );
  }

  public getToken() {
    return localStorage.getItem('token') || '';
  }
  public getRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
  }

  public onLogOut() {
    // Logout Code over here to use with Effects
  }

  public onUserSignOn(
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    phone_number: number,
    username: string,
    gender: string,
    city: string,
    email: string,
    password: string
  ): Observable<User> {
    return this._http.post<User>(
      `${environment.apiUrl}/register/`,
      JSON.stringify({
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        username,
        gender,
        city,
        email,
        password,
      }),
      this.httpOptions
    );
  }

  public editUserInformation(
    id: number,
    username: string,
    email: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    phone_number: string,
    date_of_birth: string,
    gender: string,
    city: string,
    country: string,
    is_active: boolean,
    is_superuser: boolean,
    is_staff: boolean
  ): Observable<User> {
    return this._http.patch<User>(
      `${environment.apiUrl}/users/` + id + '/',
      {
        username,
        email,
        first_name,
        middle_name,
        last_name,
        phone_number,
        date_of_birth,
        gender,
        city,
        country,
        is_active,
        is_superuser,
        is_staff,
      },
      this.httpOptions
    );
  }

  constructor(private _http: HttpClient, public _router: Router) {}
}
