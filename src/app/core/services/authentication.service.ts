import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, observable, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';




import { environment } from '@environments/environment';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { SignUpResponse, UserCredentials } from '../shared/interfaces/users-interface';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public currentUser$ = new BehaviorSubject<number>(0);
  public expiryDate!: Date;
  public jwtAccessToken!: any;
  public jwtRefreshToken!: string;
  public payload: any;
  public userId!: number;
  public token: any;
  public errorMessage!: string;


  public get currentUserValue(): number{
    return this.currentUser$.value;
  }

  constructor(
    private http: HttpClient,
    private dataSource: RestDataSource,
    public router: Router
  ) {

  }

  getToken(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${environment.jwtLogin}`,
    JSON.stringify({ email, password }), this.httpOptions
    ).pipe(
      map((loginResponse: any) => {
        this.jwtAccessToken = loginResponse.access;
        this.jwtRefreshToken = loginResponse.refresh;
        localStorage.setItem('access', this.jwtAccessToken);
        localStorage.setItem('refresh', this.jwtRefreshToken);
        console.log(`Access Token- ${this.jwtAccessToken}, Refresh Token- ${this.jwtRefreshToken}`);
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
    console.log('Expiry Date -', this.expiryDate);
    this.currentUser$.next(this.userId);
    localStorage.setItem('payLoad', this.payload);
    console.log('Payload-', this.payload);
    return this.payload;
  }

  public isLoggedIn() {
    return localStorage.getItem('access') != null;
  }

  public onLogout() {
    localStorage.clear();
    this.currentUser$.next(NaN);
    this.router.navigate(['/login']);
  }

   public  getAccessToken() {
     return localStorage.getItem('access') || '';

   }

  public getRefreshedToken() {
    return localStorage.getItem('refresh') || '';
  }

  public generateRefreshToken() {
    let refresh = this.getRefreshedToken();
    return this.http.post(`${environment.apiUrl}/${environment.jwtRefresh}`, JSON.stringify({ refresh }), this.httpOptions).pipe(tokenRefresh => {
      this.token = tokenRefresh;
      return this.token;
    });
  }

  saveTokens(tokenData: any) {
    localStorage.setItem('refresh', tokenData.refresh);
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
    }), this.httpOptions);
  }
  }













