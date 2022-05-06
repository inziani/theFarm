import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';




import { environment } from '@environments/environment';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { JwTAuthenticationResponse, LoginResponse, SignUpResponse } from '../shared/interfaces/users-interface';
import { AuthenticatedUser } from '../shared/models/user.model';
import jwtDecode, { JwtPayload } from 'jwt-decode';
// import jwt_decode from 'jwt-decode';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public currentUser$ = new BehaviorSubject<number>(0);
  public expiryDate!: Date;
  public jwtAccessToken!: string;
  public jwtRefreshToken!: string;




  public get currentUserValue(): number{
    return this.currentUser$.value;
  }

  constructor(
    private http: HttpClient,
    private dataSource: RestDataSource) {

  }

  onLogin(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/${environment.jwtLogin}`,
    JSON.stringify({ email, password}), this.httpOptions
    ).pipe(
      map(loginResponse => {
        // login is successfull and token is in the response
        this.jwtAccessToken = loginResponse;
        return this.jwtAccessToken;
      }),
      tap(loginResponse => {
        this.saveUser(loginResponse)
      }),
      shareReplay()
    );
  }

  private saveUser(loginResponse: string) {
    let parsedUser = JSON.parse(JSON.stringify(loginResponse));
    type customJwtPayLoad = JwtPayload & { userPayloadData: string };
    let decodedToken = jwtDecode<customJwtPayLoad>(parsedUser.access);
    let finalParsedUser = JSON.parse(JSON.stringify(decodedToken));
    this.currentUser$.next(finalParsedUser.user_id);
    this.expiryDate = new Date(finalParsedUser.exp * 1000);
    return this.currentUser$;
    }

  onLogout() {
    // remove user from the local storage to log user out
    //  this.dataSource.authToken = 'null';
    //  this.dataSource.authTokenRefresh = 'null';
    this.jwtAccessToken = 'null';
    this.jwtRefreshToken = 'null';

  }

   get authenticated() {
    // return this.dataSource.authToken != null;
    //  this.currentUser$.subscribe(token => {
    //    let access = JSON.parse(JSON.stringify(token));
    //    this.jwtAccessToken = access.access;
    //  });
    //  console.log('authenticated tokens', this.jwtAccessToken);
     return this.jwtAccessToken != null;
   }

  get refreshedToken() {
    // return this.dataSource.refreshToken != null;
    return this.jwtRefreshToken != null;
  }

   onUserSignOn(
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    phone_number: number,
    username: string,
    gender: string,
    city: string,
    email: string,
    password: string): Observable<any> {
    return this.http.post<SignUpResponse>(`${environment.apiUrl}/register/`, JSON.stringify({
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      username,
      gender,
      city,
      email,
      password

    }), this.httpOptions).pipe(catchError(errorResponse => {
      let errorMessage = "An unknown error occurred";
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }
      switch (errorResponse.error.error.message) {
        case "user with this email already exists.":
          errorMessage = 'This email exists!';
      }
      return throwError(errorMessage);
    }));
  };


  }













