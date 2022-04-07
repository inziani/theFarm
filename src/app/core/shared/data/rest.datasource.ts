import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, map, shareReplay, tap } from 'rxjs/operators';


import jwtDecode, { JwtPayload } from 'jwt-decode';


import { User } from "../models/user.model";
import { UserInterface, UserProfileInterface } from "../interfaces/users-interface";
import { Activity } from "../models/activity.model";

import { ActivityCategoryInterface, ActivityInterface } from "../interfaces/activity-interface";
import { RandomQuote } from "../interfaces/activity-interface";

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
      'Content-Type': 'application/json',
      'accept': 'application/json'


    })
  };

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public activityCategoryList!: ActivityCategory[];
  public activityList!: Activity[];
  public payload: any;
  public userId!: number;
  public expiryDate!: Date;
  public singleCatergory!: any;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.apiUrl}/users/`);
  }

  getAllUserProfiles(): Observable<UserProfileInterface[]>{
    return this.http.get<UserProfileInterface[]>(`${environment.apiUrl}/user-profile/`)
  }

  getToken(email: string, password: string): Observable<any> {
    return this.http.post<AuthenticatorResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({ email, password }), this.httpOptions).pipe(
      map((response: any) => {
        this.authToken = response.access;
        this.authTokenRefresh = response.refresh;
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
    // console.log(`Payload - ${this.payload},User - ${this.userId}`);
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
    return this.http.get<RandomQuote>(`${environment.randomQuotesURL}/random.json/`, this.httpOptions,);
  }

  addActivityCategory(title: string, description: string, category: string) {
    return this.http.post<ActivityCategory>(`${environment.apiUrl}/activityscategorys/`, JSON.stringify({ title, description, category }), this.httpOptions)
  };

  addActivity(title: string, description: string, status: string, activity_category: number) {
    return this.http.post<Activity>(`${environment.apiUrl}/activitys/`, JSON.stringify({ title, description, status, activity_category }), this.httpOptions)
  };

  editActivity(id: number, title: string, description: string,status: string, activity_category: number) {
    return this.http.patch<any>(`${environment.apiUrl}/activitys/` + id + '/', { title, description, status, activity_category}, { headers: this.httpHeaders });
  }

   deleteActivity(id: number): Observable<number> {
    return this.http.delete<any>(`${environment.apiUrl}/activitys/` + id + '/');
  }

  fetchActivityCategory(): Observable<ActivityCategoryInterface[]> {
    return this.http.get<ActivityCategoryInterface[]>(`${environment.apiUrl}/activityscategorys/`, this.httpOptions);
  }

  fetchSingleActivityCategory(id: number): Observable<ActivityCategoryInterface> {
    return this.http.get<any>(`${environment.apiUrl}/activityscategorys/` + id + '/', { headers: this.httpHeaders });
  }

  editActivityCategory(id: number, title: string, description: string, category: string ): Observable<ActivityCategoryInterface> {
    return this.http.patch<any>(`${environment.apiUrl}/activityscategorys/` + id + '/', {title, description,category },
      { headers: this.httpHeaders });
  }

  deleteActivityCategory(id: number): Observable<ActivityCategoryInterface> {
    return this.http.delete<any>(`${environment.apiUrl}/activityscategorys/` + id + '/');
  }

  fetchUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/register/`, this.httpOptions);
  }

  fetchUserProfiles(): Observable<UserProfileInterface>{
    return this.http.get<UserProfileInterface>(`${environment.apiUrl}/user-profile`, this.httpOptions);
  }



  fetchActivityDb(sort: string, order: SortDirection, page: number): Observable<Activity[]>{
     return this.http.get<Activity[]>(`${environment.apiUrl}/activitys/`, this.httpOptions);
  }

  fetchActivityList(): Observable<ActivityInterface[]>{
     return this.http.get<ActivityInterface[]>(`${environment.apiUrl}/activitys/`, this.httpOptions);
  }

   fetchSingleActivity(id: number): Observable<Activity>{
    return this.http.get<Activity>(`${environment.apiUrl}/activitys/` + id + '/', {headers: this.httpHeaders});
  };


}
