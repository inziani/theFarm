import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay,tap } from 'rxjs/operators';
import * as moment from "moment";


import { environment } from 'src/environments/environment';
import { User } from '@app/shared/models/user.model';



interface AuthenticationResponse{
  refresh: string,
  access: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // http options used to make the API calls
  private httpOptions: any;

  // the actual jwt token
  // public token: AuthenticationResponse = {'access': '','refresh': ''};
  // public tokenData = [];
  public token: string = ''

  // the token expiration date
  public token_expires = new Date();

  //  the email address of the user logged in 
  public email: string = '';

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


  onLoginTokenObtained(email: string, password: string){
    // console.log(email, password);
    // return this.http.post<User>(`${environment.apiUrl}/api/token/`, { email: email, password: password}, this.httpOptions).pipe(tap(res=> this.setSession),shareReplay()) ;
  //  return this.http.get<User[]>(`${environment.apiUrl}/users/`).subscribe(returnedData =>{
  return this.http.post<AuthenticationResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({email, password}), this.httpOptions).subscribe(returnedData =>{
     console.log(returnedData);
    // this.token = returnedData;
     this.updateToken(returnedData);

   }, 
   err =>{ 
     this.errors = err['error'];
   });

   }

   private updateToken(returnedData: any){
    //  this.token.access = token.access;
    //  this.token.refresh = token.refresh;
    this.token = returnedData;
     this.errors = [];
     console.log(this.token);
  
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
