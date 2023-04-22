import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, mapTo, shareReplay, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { JwTAuthenticationResponseInterface, SignUpResponse } from '../shared/interfaces/users-interface';
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

  public jwtAccessToken!: string;
  public jwtRefreshToken!: string;
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  userData$: Observable<any> = this.userDataSubject.asObservable();

  // *********************End of New Code***********************

  // ******************** Old Code******************************
  // public currentUser$ = new BehaviorSubject<number>(0);
  // public user$ = new Subject<number>();
  // public expiryDate!: Date;
  // public jwtAccessToken!: string;
  // public jwtRefreshToken!: string;
  // public payload: any;
  // public userId!: number;
  // public token: any;
  // public errorMessage!: string;
  // public mappedToken!: JwTAuthenticationResponseInterface;
  // private _$userProfileDataSource = new BehaviorSubject<UserProfile>({
  //   user: NaN,
  //   education_bio: 'education_bio',
  //   professional_bio: 'professional_bio',
  //   professional_hobbies: 'professional_hobbies',
  //   personal_hobbies: 'personal_hobbies',
  //   social_hobbies: 'social_hobbies',
  //   profile_pic: { url: ''},
  //   create_at: new Date(),
  //   updated_at: new Date(),
  // });
  // public userProfileData: Observable<UserProfile> =
  //   this._$userProfileDataSource.asObservable();
  // public $profile = new BehaviorSubject<UserProfile>({
  //   user: NaN,
  //   education_bio: 'education_bio',
  //   professional_bio: 'professional_bio',
  //   professional_hobbies: 'professional_hobbies',
  //   personal_hobbies: 'personal_hobbies',
  //   social_hobbies: 'social_hobbies',
  //   profile_pic: {url: ''},
  //   create_at: new Date(),
  //   updated_at: new Date(),
  // });
  // public test!: any;

  // public get currentUserValue(): number {
  //   return this.currentUser$.value;
  // }

  // *************************End of Old Code

  constructor(private http: HttpClient, public router: Router) {
    if (
      localStorage.getItem(this.jwtAccessToken) &&
      localStorage.getItem(this.jwtRefreshToken)
    ) {
      const jwtAccessToken = <string>localStorage.getItem(this.jwtAccessToken);
      const jwtRefreshToken = <string>(
        localStorage.getItem(this.jwtRefreshToken)
      );
      this.userDataSubject.next({
        jwtAccessToken,
        jwtRefreshToken,
        userInfo: this.getUserDataFromToken(jwtAccessToken),
      });
    }
  }

  get userData(): any {
    return this.userDataSubject.value;
  }

  public login(
    email: string,
    password: string
  ): Observable<JwTAuthenticationResponseInterface> {
    return this.http
      .post<JwTAuthenticationResponseInterface>(
        `${environment.apiUrl}/${environment.jwtLogin}`,
        JSON.stringify({ email, password }),
        this.httpOptions
      )
      .pipe(
        map((responseData: JwTAuthenticationResponseInterface) => {
          const access_token = responseData?.access;
          const refresh_token = responseData?.refresh;
          this.userDataSubject.next({
            access_token,
            refresh_token,
            userInfo: this.getUserDataFromToken(access_token),
          });
          localStorage.setItem(this.jwtAccessToken, access_token);
          localStorage.setItem(this.jwtRefreshToken, refresh_token);
          return responseData;
        })
      );
  }

  public onLogout(): void {
    localStorage.removeItem(this.jwtAccessToken);
    localStorage.removeItem(this.jwtRefreshToken);
    this.userDataSubject.next(null);
  }

  public generateRefreshTokens(): Observable<JwTAuthenticationResponseInterface> {
    const refresh_token = this.userDataSubject.value?.refresh_token;
    return this.http
      .post<JwTAuthenticationResponseInterface>(
        `${environment.apiUrl}/${environment.jwtRefresh}`,
        { refresh_token }
      )
      .pipe(
        map((responseData: JwTAuthenticationResponseInterface) => {
          const access_token = responseData?.access;
          const refresh_token = responseData?.refresh;
          this.userDataSubject.next({
            access_token,
            refresh_token,
            userInfo: this.getUserDataFromToken(access_token),
          });
          localStorage.setItem(this.jwtAccessToken, access_token);
          localStorage.setItem(this.jwtRefreshToken, refresh_token);
          return responseData;
        })
      );
  }

  get isAuthenticated(): boolean {
    const refresh_token = this.userDataSubject.value?.refresh_token;
    if (!refresh_token) {
      return false;
    }
    return this.isAuthTokenValid(refresh_token);
  }

  public isAuthTokenValid(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const expMilSecond: number = decoded?.exp * 1000;
    const currentTime = Date.now();
    if (expMilSecond < currentTime) {
      return false;
    }
    return true;
  }

  public getUserDataFromToken(token: string): any {
    const decoded: any = jwtDecode(token);
    return decoded.data;
  }
  // ****************Old Code*****************
  // public obtainJwTToken(
  //   email: string,
  //   password: string
  // ): Observable<JwTAuthenticationResponseInterface> {
  //   return this.http
  //     .post<JwTAuthenticationResponseInterface>(
  //       `${environment.apiUrl}/${environment.jwtLogin}`,
  //       JSON.stringify({ email, password }),
  //       this.httpOptions
  //     )
  //     .pipe(
  //       tap((responseData) => {
  //         this.saveUserTokens(responseData);
  //       }),
  //       shareReplay()
  //     );
  // }

  // private saveUserTokens(responseData: JwTAuthenticationResponseInterface) {
  //   this.mappedToken = responseData;
  //   this.jwtAccessToken = responseData.access;
  //   this.jwtRefreshToken = responseData.refresh;
  //   return this.mappedToken;
  // }

  // public getToken(email: string, password: string): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `${environment.apiUrl}/${environment.jwtLogin}`,
  //       JSON.stringify({ email, password }),
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map((loginResponse: any) => {
  //         this.jwtAccessToken = loginResponse.access;
  //         this.jwtRefreshToken = loginResponse.refresh;
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
  //   this.test = this._fetchUserProfile(finaldecodedToken.user_id);
  //   return this.payload;
  // }

  // private _fetchUserProfile(userId: number): Observable<UserProfile> {
  //   return this.http
  //     .get<UserProfile>(
  //       `${environment.apiUrl}/user-profile` + userId + '/',
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map((userProfileDataSource) => {
  //         this._$userProfileDataSource.next(userProfileDataSource);
  //         console.log(
  //           'BEHAVIOUR SUBJECT USER - ',
  //           this._$userProfileDataSource
  //         );
  //         return userProfileDataSource;
  //       }),
  //       shareReplay()
  //     );
  // }

  // public isLoggedIn() {
  //   return this.jwtAccessToken;
  // }

  // public onLogout() {
  //   this.currentUser$.next(NaN);
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
  //   return this.http
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
    return this.http.post<User>(
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
    return this.http.patch<User>(
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













