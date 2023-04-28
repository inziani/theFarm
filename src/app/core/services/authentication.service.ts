import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map, mapTo, shareReplay, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import {
  JWTDecodedTokenInterface,
  JwTAuthenticationResponseInterface,
  SignUpResponse,
} from '../shared/interfaces/users-interface';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { User, UserProfile } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // *********************New Code******************************

  private _isLoggedOn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoggedOnData$: Observable<boolean> =
    this._isLoggedOn$.asObservable();
  public  _loggedInUser$ = new BehaviorSubject<JWTDecodedTokenInterface>({
    token_type: 'string',
    exp: NaN,
    iat: NaN,
    jti: 'string',
    user_id: NaN,
  });
  public readonly _loggedInUserData$: Observable<JWTDecodedTokenInterface> =
    this._loggedInUser$.asObservable();

  public jwtHelper = new JwtHelperService();

  // *********************End of New Code***********************

  // ******************** Old Code******************************
  // public currentUser$ = new BehaviorSubject<number>(0);
  // private _jwtTokens$ = new BehaviorSubject<JwTAuthenticationResponseInterface>(
  //   {
  //     access: '',
  //     refresh: '',
  //   }
  // );
  // readonly tokenData: Observable<JwTAuthenticationResponseInterface> =
  //   this._jwtTokens$.asObservable();

  // public user$ = new Subject<number>();
  // public expiryDate!: Date;
  // public jwtAccessToken!: string;
  // public jwtRefreshToken!: string;
  // public payload: any;
  // public userId!: number;
  // public token: any;
  public errorMessage!: string;

  constructor(private _http: HttpClient, public router: Router) {}

  // *********************New Code******************************

  //  New Methods

  public onLogOn(email: string, password: string) {
    return this._http
      .post<JwTAuthenticationResponseInterface>(
        `${environment.apiUrl}/${environment.jwtLogin}`,
        JSON.stringify({ email, password }),
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          this._isLoggedOn$.next(true);
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          var loggedInUserData = this.jwtHelper.decodeToken(
            response.access
          ) as JWTDecodedTokenInterface;
          this._loggedInUser$.next(loggedInUserData);
        })
      );
  }

  public onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public onRefreshPage(refresh: string) {
    return this._http.post<any>(
      `${environment.apiUrl}/${environment.jwtRefresh}`,
      { refresh },
      this.httpOptions
    );
      // .pipe(
      //   tap((response) => {
      //     this._isLoggedOn$.next(true);
      //     var loggedInUserData = this.jwtHelper.decodeToken(
      //       response.access
      //     ) as JWTDecodedTokenInterface;
      //     this._loggedInUser$.next(loggedInUserData);
      //   })
      // );
  }

  // *********************End of New Code***********************


  // get tokensData(): JwTAuthenticationResponseInterface {
  //   return this._jwtTokens$.value;
  // }
  // public getToken(email: string, password: string): Observable<any> {
  //   return this._http
  //     .post<any>(
  //       `${environment.apiUrl}/${environment.jwtLogin}`,
  //       JSON.stringify({ email, password }),
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map((loginResponse: any) => {
  //         this.jwtAccessToken = loginResponse.access;
  //         this.jwtRefreshToken = loginResponse.refresh;
  //         this._jwtTokens$.next(loginResponse);
  //         return this.jwtAccessToken, this.jwtRefreshToken;
  //       }),
  //       tap((loginResponse) => {
  //         this._saveUser(loginResponse);
  //       }),
  //       shareReplay()
  //     );
  // }
  // private _saveUser(loginResponse: any) {
  //   type customJwtPayLoad = JwtPayload & { userPayloadData: string };
  //   let decodedToken = jwtDecode<customJwtPayLoad>(loginResponse);
  //   this.payload = JSON.stringify(decodedToken);
  //   let finaldecodedToken = JSON.parse(this.payload);
  //   this.userId = finaldecodedToken.user_id;
  //   this.expiryDate = new Date(finaldecodedToken.exp * 1000);
  //   this.currentUser$.next(this.userId);
  //   return this.payload;
  // public isLoggedIn$() {
  //   if (this.jwtAccessToken) return of(true);
  //   return of(false);
  // }
  // public onLogout() {
  //   this.currentUser$.next(NaN);
  //   localStorage.clear();
  //   this.router.navigate(['/login']);
  // }

  // public getAccessToken() {
  //   return this.jwtAccessToken;
  // }

  // public getRefreshedToken() {
  //   return this.jwtRefreshToken;
  // }

  // public generateRefreshToken() {
  //   let refresh = this.getRefreshedToken();
  //   return this._http
  //     .post(
  //       `${environment.apiUrl}/${environment.jwtRefresh}`,
  //       JSON.stringify({ refresh }),
  //       this.httpOptions
  //     )
  //     .pipe((tokenRefresh) => {
  //       this.token = tokenRefresh;
  //       return this.token;
  //     });
  // }
  // **********************End of old code********************

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
}
