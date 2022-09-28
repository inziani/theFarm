import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, observable, Observable, Subject, throwError } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';




import { environment } from '@environments/environment';
import { JwTAuthenticationResponseInterface, SignUpResponse, UserCredentials } from '../shared/interfaces/users-interface';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public currentUser$ = new BehaviorSubject<number>(0);
  public user$ = new Subject<number>();
  public expiryDate!: Date;
  public jwtAccessToken!: string;
  public jwtRefreshToken!: string;
  public payload: any;
  public userId!: number;
  public token: any;
  public errorMessage!: string;
  public mappedToken!: JwTAuthenticationResponseInterface;



  public get currentUserValue(): number{
    return this.currentUser$.value;
  }

  constructor(
    private http: HttpClient,
    public router: Router
  ) {

  }

  public obtainJwTToken(
    email: string,
    password: string
  ): Observable<JwTAuthenticationResponseInterface>{
    return this.http.post<JwTAuthenticationResponseInterface>
      (`${environment.apiUrl}/${environment.jwtLogin}`,
        JSON.stringify({ email, password }), this.httpOptions).
      pipe(tap(responseData => {
        this.saveUserTokens(responseData);
      }),
        shareReplay()
      );
  }

  private saveUserTokens(responseData: JwTAuthenticationResponseInterface) {
    this.mappedToken = responseData
    this.jwtAccessToken = responseData.access;
    this.jwtRefreshToken = responseData.refresh;
    return this.mappedToken;

    // type customJwtPayLoad = JwtPayload & { userPayloadData: string };
    // let decodedToken = jwtDecode<customJwtPayLoad>(responseData.access);
    // this.payload = JSON.stringify(decodedToken);
    // let finaldecodedToken = JSON.parse(this.payload);
    // this.userId = finaldecodedToken.user_id;
    // this.expiryDate = new Date(finaldecodedToken.exp * 1000);
    // this.currentUser$.next(this.userId);
    // return this.payload;


  }

  public getToken(
    email: string,
    password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${environment.jwtLogin}`,
      JSON.stringify(
        { email, password }), this.httpOptions).pipe(
          map((loginResponse: any) => {
            this.jwtAccessToken = loginResponse.access;
            this.jwtRefreshToken = loginResponse.refresh;
            return this.jwtAccessToken, this.jwtRefreshToken;
          },),
          tap(loginResponse => {
            this.saveUser(loginResponse)
          }),
          shareReplay());
  }



  private saveUser(loginResponse: any) {
    type customJwtPayLoad = JwtPayload & { userPayloadData: string };
    let decodedToken = jwtDecode<customJwtPayLoad>(loginResponse);
    this.payload = JSON.stringify(decodedToken);
    let finaldecodedToken = JSON.parse(this.payload);
    this.userId = finaldecodedToken.user_id;
    this.expiryDate = new Date(finaldecodedToken.exp * 1000);
    this.currentUser$.next(this.userId);
    return this.payload;
  }

  public isLoggedIn() {
    return this.jwtAccessToken;
  }

  public onLogout() {
    this.currentUser$.next(NaN);
    this.router.navigate(['/login']);
  }

  public getAccessToken() {
     return this.jwtAccessToken;

   }

  public getRefreshedToken() {
    return this.jwtRefreshToken;
  }

  public generateRefreshToken() {
    let refresh = this.getRefreshedToken();
    return this.http.post(`${environment.apiUrl}/${environment.jwtRefresh}`, JSON.stringify({ refresh }), this.httpOptions).pipe(tokenRefresh => {
      this.token = tokenRefresh;
      return this.token;
    });
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
    }), this.httpOptions);
  }
}













