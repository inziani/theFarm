import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, shareReplay,tap } from 'rxjs/operators';

import * as moment from 'moment';
// import * as jwtDecode from 'jwt-decode';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { User } from '@app/shared/models/user.model';
import { KeyValuePipe } from '@angular/common';
import { RestDataSource } from '@app/shared/data/rest.datasource';


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

  // // http options used to make the API calls
  private httpOptions: any;

  // // the actual jwt token
  public token!: any;

  // the token expiration date
  
  public token_expires!: Date;

  // User Details
  public userDetails: any;
 

  // //  error message received on loging in

  // public errors: any[] = [];

  constructor(
    private http: HttpClient,
    private dataSource: RestDataSource ) 
    { 
    this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    // this.userDetails = this.jwtPayloadData(this.dataSource.authToken);
    this.userDetails = this.dataSource.authToken;
  
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

  private setSession(authResult: any){
    // console.log(this.token);
    return this.token = authResult;
  }

  onLogin(email: string, password: string): Observable<any>{
    return this.dataSource.getToken( email, password );
  }

  get authenticated(){
    return this.dataSource.authToken!=null;
  }

  get refreshedToken(){
    return this.dataSource.refreshToken!=null;
  }


  onLogout(){
    // remove user from the local storage to log user out
     this.dataSource.authToken = 'null';

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
