import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map, shareReplay,tap } from 'rxjs/operators';

// import * as jwtDecode from 'jwt-decode';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { User } from "../models/user.model";
import { Activity } from "../models/activity.model";
import { ActivityCategoryInterface } from "../interfaces/activity-category";

import { environment } from "@environments/environment";
import { ActivityCategory } from "../models/activity-category.models";

interface AuthenticationResponse{
    refresh: string,
    access: string
  }

@Injectable()

export class RestDataSource{
   public authToken!: string;
   public authTokenExpiry!: Date;
   public user!: string;
   public httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
   public activityCategoryList!: ActivityCategory[];
   
   constructor(private http : HttpClient){

    }

    getAllUsers(){
      return this.http.get<User[]>(`${environment.apiUrl}/users/`);
    }

    getToken(email: string, password: string): Observable<any>{
        return this.http.post<AuthenticatorResponse>(`${environment.apiUrl}/api/token/`, JSON.stringify({email, password}), this.httpOptions).pipe(
        map((response:any ) => { this.authToken = response.access;
          this.user = this.authToken;
        return this.authToken;}
        ));
      }


    refreshToken(): Observable<any>{
      return this.http.post<AuthenticatorResponse>(`${environment.apiUrl}/api/token/refresh/`, this.httpOptions).pipe(
        map((response:any ) => { this.authToken = response.refresh;
        return this.authToken;}
        ));
    }

  

    addActivityCategory(title: string, description: string, category: string){
        return this.http.post<ActivityCategory>(`${environment.apiUrl}/activityscategorys`, JSON.stringify({ title, description, category}), this.httpOptions)
    };

    getActivityCategory(): Observable<ActivityCategory[]>{
        return this.http.get<ActivityCategoryInterface[]>(`${environment.apiUrl}/activityscategorys/`, this.httpOptions );
     }
}

