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
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public loggedInUser = new Subject<User>();

  // http options used to make the API calls
  private httpOptions: any;

  // the actual jwt token
  public token!: string;
  public tokenId!: string;

  // the token expiration date
  public token_expires!: Date;

  //  the email address of the user logged in 
  public user_id!: number;

  //  error message received on loging in

  public errors: any[] = [];

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
    

    this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    
  }
  public get currentUserValue(): User{
    return this.currentUserSubject.value;

  }

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

  onLogin(email: string, password: string){
  return this.http.post<AuthenticationResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({email, password}), this.httpOptions).pipe(tap(returnedData =>{
     this.updateToken(returnedData);
   }), shareReplay());
}

   private updateToken(returnedData: any){
    // const base64Url = JSON.stringify(returnedData).split('.')[1];
    // const base64 = base64Url.replace('-', '+').replace('_', '/');
    // const parsed = JSON.parse(window.atob(base64));
    // console.log(parsed);
    // this.token_expires = new Date(parsed.exp*1000);
    // return console.log(JSON.parse(window.atob(base64)));
    this.tokenId = returnedData
    const toke = returnedData;
    // this.token = returnedData;
    // const decoded = this.token.split('.')[1];
    const tokened = JSON.stringify(toke);
    // this.errors = [];
    // console.log(this.token);
    // console.log(decoded);

    const token_parts = tokened.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp*1000);
    this.user_id = token_decoded.user_id;
    this.token = token_decoded.jti;
    console.log(this.token);

    // decode the token to read the username, email and expiration stamp
  
  }


  private setSession(authenticationResult: any){
    const expiresAt = moment().add(authenticationResult.expiresIn, 'second');
    localStorage.setItem('id_token', authenticationResult.idToken)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );

  }

  onLogout(){
    // remove user from the local storage to log user out
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(){
    return !this.isLoggedIn;
  }

  getExpiration(){
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

}
