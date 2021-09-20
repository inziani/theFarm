import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, map, shareReplay,tap } from 'rxjs/operators';

// import * as jwtDecode from 'jwt-decode';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import * as moment from 'moment';

import { User } from "../models/user.model";
import { Activity } from "../models/activity.model";
import { ActivityCategoryInterface } from "../interfaces/activity-category";
import { RandomQuote } from "../home/interfaces/random-quote";

import { environment } from "@environments/environment";
import { ActivityCategory } from "../models/activity-category.models";
import { Router } from "@angular/router";

interface AuthenticationResponse{
    refresh: string,
    access: string
  }

@Injectable()

export class RestDataSource{
   public todaysDate = new Date();
   public authToken!: string;
   public authTokenRefresh!: string;
   public authTokenExpiry!: Date;
  //  public user = new Subject<any>();
   public user = new BehaviorSubject<any>(null);
   public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
   public activityCategoryList!: ActivityCategory[];
   public payload: any;
   public userId!: number;
   public expiryDate!: Date;
   
   constructor(
     private http : HttpClient,
     private router: Router
     ){

    
    }

    getAllUsers(){
      return this.http.get<User[]>(`${environment.apiUrl}/users/`);
    }

    // getToken(email: string, password: string): Observable<any>{
    //     return this.http.post<AuthenticatorResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({email, password}), this.httpOptions).pipe(
    //     map((response: any ) => { 
    //       this.authToken = response.access;
    //       console.log('access:',this.authToken);
    //       this.authTokenRefresh = response.refresh;
    //       console.log('refresh:', this.authTokenRefresh);
    //     return this.authTokenRefresh;},
    //     ));
    //   }

    getToken(email: string, password: string): Observable<any>{
      return this.http.post<AuthenticatorResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({email, password}), this.httpOptions).pipe(
      map((response: any ) => { 
        this.authToken = response.access;
        console.log('access:',this.authToken);
        this.authTokenRefresh = response.refresh;
        console.log('refresh:', this.authTokenRefresh);
      return this.authTokenRefresh;
    },
      ), 
      tap(respData=>{
        this.storeUser(respData)
      }), shareReplay());
    }

    private storeUser(token: any){
      type customJwtPayLoad = JwtPayload & { userPayloadData: string }
      let decodedToken = jwtDecode<customJwtPayLoad>(token);
      this.payload = JSON.stringify(decodedToken);
      let finaldecodedToken = JSON.parse(this.payload);
      this.userId = finaldecodedToken.user_id;
      this.expiryDate = new Date(finaldecodedToken.exp*1000);
      this.user.next(this.userId);
      //console.log(this.user);
      localStorage.setItem('userData', this.payload);
      return this.payload;
    }


    refreshToken(): Observable<any>{
      const userData = JSON.parse(localStorage.getItem('userData')!);
      return this.http.post<any>(`${environment.apiUrl}/api/token/refresh/`, {userData}, this.httpOptions).pipe(
        map((response:any ) => { this.authTokenRefresh = response.refresh;
        return this.authTokenRefresh;}), shareReplay());
      // return this.http.post<any>(`${environment.apiUrl}/api/token/refresh/`, {userData}, this.httpOptions);
    }

    removeToken(){
      this.user.next(null);
      this.router.navigate(['/login'])

    }

     jwtPayloadData(token: any){
      type customJwtPayLoad = JwtPayload & { userPayloadData: string }
      let decodedToken = jwtDecode<customJwtPayLoad>(token);
      this.payload = JSON.stringify(decodedToken);
      let finaldecodedToken = JSON.parse(this.payload);
      this.userId = finaldecodedToken.user_id;
      this.expiryDate = new Date(finaldecodedToken.exp*1000);
      this.user.next(this.userId);
     // console.log(this.user);
      return this.payload;
    }


    fetchRandomQuotes(){
      return this.http.get<RandomQuote>(`${environment.randomQuotesURL}`, this.httpOptions,);
    }

    addActivityCategory(title: string, description: string, category: string){
        return this.http.post<ActivityCategory>(`${environment.apiUrl}/activityscategorys`, JSON.stringify({ title, description, category}), this.httpOptions)
    };

    getActivityCategory(): Observable<ActivityCategory[]>{
        return this.http.get<ActivityCategoryInterface[]>(`${environment.apiUrl}/activityscategorys/`, this.httpOptions );
     }
}

