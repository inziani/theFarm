import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";



import { Activity } from "@app/core/shared/models/activity.model";
import { environment } from "@environments/environment";

@Injectable({providedIn:'root'})

export class ActivitysService{

  error = new Subject<string>();
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  activityListChanged = new Subject<Activity[]>();

  private activityList: Activity[]= []

  constructor(private http: HttpClient){

  }

  addActivityonList(activity: Activity){
    this.activityList.push(activity);
    this.activityListChanged.next(this.activityList.slice());

  }

  getActivitysList(){
    return this.activityList;
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
