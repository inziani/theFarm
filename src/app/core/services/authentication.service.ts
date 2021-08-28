import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, shareReplay,tap } from 'rxjs/operators';

import * as moment from 'moment';
import * as jwtDecode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { User } from '@app/shared/models/user.model';

interface AuthenticationResponse{
  refresh: string,
  access: string
}

interface SignUpResponse{
  email: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  // public loggedInUser = new Subject<User>();

  // // http options used to make the API calls
  private httpOptions: any;

  // // the actual jwt token
  // public token!: string;
  // public tokenId!: string;

  // // the token expiration date
  // public token_expires!: Date;

  // //  the email address of the user logged in 
  // public user_id!: number;

  // //  error message received on loging in

  // public errors: any[] = [];

  constructor(private http: HttpClient) { 
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    // this.currentUser = this.currentUserSubject.asObservable();
    this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    
  }
  // public get currentUserValue(): User{
  //   return this.currentUserSubject.value;

  // }

  onUserSignOn(username: string, email: string, password: string){
    return this.http.post<SignUpResponse>(`${environment.apiUrl}/register/`, JSON.stringify({ 
      username: username, 
      email: email, 
      password: password}), this.httpOptions).pipe(catchError(errorResponse => {
        let errorMessage = "An unknown error occurred";
        if (!errorResponse.error || !errorResponse.error.error){
          return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
          case "user with this email already exists.":
            errorMessage = 'This email exists!';
        }
        return throwError(errorMessage);
      }));
  };


  private setSession(authenticationResult: any){
    const id_token = authenticationResult.id_token;
    const payload = <jwtDecode.JwtPayload>jwtDecode;
    // const expiresAt = moment.unix(payload.exp);
    const expiresAt = moment().add(authenticationResult.expiresIn, 'second');
    localStorage.setItem('id_token', authenticationResult.idToken)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log(authenticationResult)
  }

  get token(): string{
    return localStorage.getItem('token')!;
  }

  onLogin(email: string, password: string){
    return this.http.post<AuthenticationResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({email, password}), this.httpOptions).pipe(tap(response =>
       this.setSession(response)), shareReplay());
  }

  onLogout(){
    // remove user from the local storage to log user out
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    
  }

  getExpiration(){
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  refreshToken(){
    if(moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())){
      return this.http.post(`${environment.apiUrl}/api/token/refresh/`, { token: this.token}).
      pipe(tap(response=>this.setSession(response)),
      shareReplay(),).subscribe();
    }
    return
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(){
    return !this.isLoggedIn;
  }

}
