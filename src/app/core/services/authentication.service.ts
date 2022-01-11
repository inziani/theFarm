import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';




import { environment } from 'src/environments/environment';
import { RestDataSource } from '@app/shared/data/rest.datasource';



interface AuthenticationResponse {
  refresh: string,
  access: string
}

interface SignUpResponse {
  email: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  userDetails = new BehaviorSubject<any>(null);




  constructor(
    private http: HttpClient,
    private dataSource: RestDataSource) {

  }

  onLogin(email: string, password: string): Observable<any> {
    return this.dataSource.getToken(email, password);

  }

  onLogout() {
    // remove user from the local storage to log user out
     this.dataSource.authToken = 'null';
     this.dataSource.authTokenRefresh = 'null';

  }

   get authenticated() {
    return this.dataSource.authToken != null;
   }
  get refreshedToken() {
    return this.dataSource.refreshToken != null;
  }
   onUserSignOn(
    firstName: string,
    lastName: string,
    birthday: Date,
    phoneNumber: number,
    username: string,
    gender: string,
    city: string,
    email: string,
    password: string): Observable<any> {
    return this.http.post<SignUpResponse>(`${environment.apiUrl}/register/`, JSON.stringify({
      firstName,
      lastName,
      birthday,
      phoneNumber,
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













