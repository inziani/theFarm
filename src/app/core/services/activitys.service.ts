import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";



import { Activity } from "src/app/shared/models/activity.model";
import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})

export class ActivitysService{

  error = new Subject<string>();
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  activityListChanged = new Subject<Activity[]>();

  private activityList: Activity[]= [
    // new Activity(0, 'Slug', 'Title', 'Description', 'Activity Category', 'Created', '', 19, ''),
    // new Activity(1, 'Django Slug', 'Django Backend', 'Django interface with Angular Frontend', 'Official', 'Created')
  ]

  constructor(private http: HttpClient){

  }

  addActivityonList(activity: Activity){
    this.activityList.push(activity);
    this.activityListChanged.next(this.activityList.slice());

  }

  getActivitysList(){
    return this.activityList;
  }

  getActivityRequest(): Observable<Activity[]>{
     return this.http.get<Activity[]>(`${environment.apiUrl}/activitys/`, {headers: this.httpHeaders});
  }

  getSingleActivityRequest(id: number): Observable<Activity>{
    return this.http.get<Activity>(`${environment.apiUrl}/activitys/` + id + '/', {headers: this.httpHeaders});
  };

  addNewActivity(title: string, slug: number, activityCategory:string, description: string, status: string): Observable<Activity>{
    return this.http.post<Activity>(`${environment.apiUrl}/activitys/`, JSON.stringify({
      title, slug, activityCategory, description,status }), { headers: this.httpHeaders });

  }
  deleteActivity(){
    return this.http.delete(`${environment.apiUrl}/activitys/`);
    
  }
}
