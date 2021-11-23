import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

// import * as jwtDecode from 'jwt-decode';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import * as moment from 'moment';

import { User } from "../models/user.model";
import { Activity } from "../models/activity.model";
import { ActivityCategoryInterface } from "../interfaces/activity-category";
import { RandomQuote } from "../interfaces/random-quote";

import { environment } from "@environments/environment";
import { ActivityCategory } from "../models/activity-category.models";
import { Router } from "@angular/router";
import { SortDirection } from "@angular/material/sort";

interface AuthenticationResponse {
  refresh: string,
  access: string
}

@Injectable()

export class RestDataSource {
  public todaysDate = new Date();
  public authToken!: string;
  public authTokenRefresh!: string;
  public authTokenExpiry!: Date;
  public user = new BehaviorSubject<any>(null);
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'


    })
  };
  public activityCategoryList!: ActivityCategory[];
  public activityList!: Activity[];
  public payload: any;
  public userId!: number;
  public expiryDate!: Date;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/`);
  }

  getToken(email: string, password: string): Observable<any> {
    return this.http.post<AuthenticatorResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({ email, password }), this.httpOptions).pipe(
      map((response: any) => {
        this.authToken = response.access;
        // console.log('access:', this.authToken);
        this.authTokenRefresh = response.refresh;
        // console.log('refresh:', this.authTokenRefresh);
        console.log(`Access - ${this.authToken}, Refresh - ${this.authTokenRefresh}, User - ${this.userId}`)
        return this.authToken;
      },
      ),
      tap(respData => {
        this.storeUser(respData)
      }), shareReplay());
  }

  private storeUser(token: any) {
    type customJwtPayLoad = JwtPayload & { userPayloadData: string }
    let decodedToken = jwtDecode<customJwtPayLoad>(token);
    this.payload = JSON.stringify(decodedToken);
    let finaldecodedToken = JSON.parse(this.payload);
    this.userId = finaldecodedToken.user_id;
    this.expiryDate = new Date(finaldecodedToken.exp * 1000);
    this.user.next(this.userId);
    console.log(`Payload - ${this.payload},User - ${this.userId}`);
    localStorage.setItem('userData', this.payload);
    return this.payload;
  }


  refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/token/refresh/`, this.httpOptions).pipe(
      map((response: any) => {
        this.authTokenRefresh = response.refresh;
        console.log(this.refreshToken);
        return this.authTokenRefresh;
      }), shareReplay());

  }

  removeToken() {
    this.user.next(null);
    this.router.navigate(['/login'])

  }

  jwtPayloadData(token: any) {
    type customJwtPayLoad = JwtPayload & { userPayloadData: string }
    let decodedToken = jwtDecode<customJwtPayLoad>(token);
    this.payload = JSON.stringify(decodedToken);
    let finaldecodedToken = JSON.parse(this.payload);
    this.userId = finaldecodedToken.user_id;
    this.expiryDate = new Date(finaldecodedToken.exp * 1000);
    this.user.next(this.userId);
    console.log(this.user);
    return this.payload;
  }


  fetchRandomQuotes() {
    return this.http.get<RandomQuote>(`${environment.randomQuotesURL}`, this.httpOptions,);
  }

  addActivityCategory(title: string, description: string, category: string) {
    return this.http.post<ActivityCategory>(`${environment.apiUrl}/activityscategorys`, JSON.stringify({ title, description, category }), this.httpOptions)
  };

  fetchActivityCategory(): Observable<ActivityCategory[]> {
    return this.http.get<ActivityCategoryInterface[]>(`${environment.apiUrl}/activityscategorys/`, this.httpOptions);
  }

  fetchUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/register`, this.httpOptions);
  }

  fetchActivityDb(sort: string, order: SortDirection, page: number): Observable<Activity[]>{
     return this.http.get<Activity[]>(`${environment.apiUrl}/activitys/`, this.httpOptions);
  }

  fetchActivityList(): Observable<Activity[]>{
     return this.http.get<Activity[]>(`${environment.apiUrl}/activitys/`, this.httpOptions);
  }


}
