import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import {
  JWTDecodedTokenInterface,
  JwTAuthenticationResponseInterface,
} from '../../authentication/models/authentication.model';
import { Router } from '@angular/router';
import { User } from '@app/features/human-resources/models/user.model';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { Store } from '@ngrx/store';
import { selectJwtToken } from '@app/authentication/store/selectors/authentication.selector';

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

  public _loggedInUser$ = new BehaviorSubject<JWTDecodedTokenInterface>({
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

  public errorMessage!: string;

  constructor(
    private _http: HttpClient,
    public _router: Router
  ) // private _store: Store<AuthenticationState>
  {
    // this._store.select(selectJwtToken).subscribe({
    //   next: (token) => console.log('Auth service tokens-', token),
    //   error: (err) => (this.errorMessage = err),
    //   complete: () => console.info('Complated'),
    // });
  }

  // *********************New Code******************************

  //  New Methods

  public onLogOnTest(email: string, password: string) {
    return this._http.post<JwTAuthenticationResponseInterface>(
      `${environment.apiUrl}/${environment.jwtLogin}`,
      JSON.stringify({ email, password }),
      this.httpOptions
    );
  }

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
    this._isLoggedOn$.next(false);
    localStorage.clear();
    this._router.navigate(['/authentication/login']);
  }

  public onRefreshPage(refresh: string) {
    return this._http.post<any>(
      `${environment.apiUrl}/${environment.jwtRefresh}`,
      { refresh },
      this.httpOptions
    );
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
}
