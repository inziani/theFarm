import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap, timeInterval } from 'rxjs';
import { environment } from '@environments/environment';
import {
  AutoLoginUser,
  JWTDecodedTokenInterface,
  JwTAuthenticationResponseInterface,
} from '../../authentication/models/authentication.model';
import { Router } from '@angular/router';
import { User } from '@app/features/human-resources/models/user.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public erroMessage!: string;
  public timeOutInterval!: any;

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

  public onRefreshPage(refresh: string) {
    return this._http.post<string>(
      `${environment.apiUrl}/${environment.jwtRefresh}`,
      { refresh },
      this.httpOptions
    );
  }

  public formatJwtToken(jwtTokens: JwTAuthenticationResponseInterface) {
    const decodedToken: JWTDecodedTokenInterface = jwtDecode(jwtTokens.access);
    const jwtToken = new JWTDecodedTokenInterface(
      decodedToken.tokenType,
      decodedToken.expiryDate,
      decodedToken.IssueDate,
      decodedToken.replayJTIDate,
      decodedToken.userId
    );
    return jwtToken;
  }

  public setUserInLocalStorage(jwtToken: JWTDecodedTokenInterface) {
    localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
    this.runTimeOutInterval(jwtToken);
  }

  public runTimeOutInterval(jwtToken: JWTDecodedTokenInterface) {
    const todaysDate = new Date().getTime() / 1000;
    const tokenExpirationDate = new Date(jwtToken.expiryDate).getTime();
    const timeInterval = tokenExpirationDate - todaysDate;

    this.timeOutInterval = setTimeout(() => {
      // logout or get refresh token
    }, timeInterval);
  }
  public getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('jwtToken');
    if (userDataString) {
      const jwtToken = JSON.parse(userDataString);
      console.log('What the Hell?', jwtToken);
      const token = new AutoLoginUser(
        jwtToken.email,
        jwtToken.id,
        jwtToken.jwtToken,
        jwtToken.jwtTokenExpirationDate,
      );
      this.runTimeOutInterval(jwtToken);
      return jwtToken;
    }
    return null;
  }

  public onLogOut() {
    localStorage.removeItem('jwtToken');
    if (this.timeOutInterval) {
      clearTimeout(this.timeOutInterval);
      this.timeOutInterval = null;
    }
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
