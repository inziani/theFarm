import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, observable, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';




import { environment } from '@environments/environment';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { SignUpResponse } from '../shared/interfaces/users-interface';
import jwtDecode, { JwtPayload } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public currentUser$ = new BehaviorSubject<number>(0);
  public expiryDate!: Date;
  public jwtAccessToken!: string;
  public jwtRefreshToken!: string;
  public payload: any;
  public userId!: number;


  public get currentUserValue(): number{
    return this.currentUser$.value;
  }

  constructor(
    private http: HttpClient,
    private dataSource: RestDataSource) {

  }

  getToken(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/${environment.jwtLogin}`,
    JSON.stringify({ email, password}), this.httpOptions
    ).pipe(
      map((loginResponse: any) => {
        // login is successfull and token is in the response
        // console.log(loginResponse);
        this.jwtAccessToken = loginResponse.access;
        // console.log('authentication service access-', this.jwtAccessToken);
        this.jwtRefreshToken = loginResponse.refresh;
        // console.log('authentication service refresh-', this.jwtRefreshToken);
        localStorage.setItem('userData', this.jwtAccessToken);
        // this.jwtRefreshToken = loginResponse;
        return this.jwtAccessToken;
      },
      ),
      tap(loginResponse => {
        this.saveUser(loginResponse)
      }),
      shareReplay()
    );
  }

  private saveUser(loginResponse: any) {
    type customJwtPayLoad = JwtPayload & { userPayloadData: string };
    let decodedToken = jwtDecode<customJwtPayLoad>(loginResponse);
    // console.log('Decoded Token - ', decodedToken);
    this.payload = JSON.stringify(decodedToken);
    // console.log('authentication service-', decodedToken);
    let finaldecodedToken = JSON.parse(this.payload);
    // console.log('Parsed payload', finaldecodedToken);
    this.userId = finaldecodedToken.user_id;
    this.expiryDate = new Date(finaldecodedToken.exp * 1000);
    this.currentUser$.next(this.userId);
    // console.log(`Payload - ${this.payload},User - ${this.userId}, CurrentUser - ${this.currentUser$}`);
    localStorage.setItem('userData', this.payload);
    return this.payload;
  }

  onLogout() {
    this.jwtAccessToken = 'null';
    this.jwtRefreshToken = 'null';

  }

   get authenticated() {
     return this.jwtAccessToken != null;
   }

  get refreshedToken() {

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













