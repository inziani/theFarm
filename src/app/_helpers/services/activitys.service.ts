import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Activity } from '@app/profile/todo/models/activity.model';
import { environment } from '@environments/environment';
import { ActivityCategoryInterface } from '@app/shared/interfaces/activity-interface';

@Injectable({ providedIn: 'root' })
export class ActivitysService {
  error = new Subject<string>();
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  public fetchSingleActivity(id: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${environment.apiUrl}/activitys/` + id + '/',
      { headers: this.httpHeaders }
    );
  }

  public fetchActivityData(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${environment.apiUrl}/activitys`, {
      headers: this.httpHeaders,
    });
  }

  public addNewActivity(
    title: string,
    slug: number,
    activityCategory: string,
    description: string,
    status: string
  ): Observable<Activity> {
    return this.http.post<Activity>(
      `${environment.apiUrl}/activitys/`,
      JSON.stringify({
        title,
        slug,
        activityCategory,
        description,
        status,
      }),
      { headers: this.httpHeaders }
    );
  }

  public editActivity(
    id: number,
    title: string,
    description: string,
    status: string,
    activity_category: number
  ) {
    return this.http.patch<any>(
      `${environment.apiUrl}/activitys/` + id + '/',
      { title, description, status, activity_category },
      { headers: this.httpHeaders }
    );
  }

  public deleteActivity() {
    return this.http.delete(`${environment.apiUrl}/activitys/`);
  }

  // **************************Activity Category*************************************

  public fetchActivityCategory(): Observable<ActivityCategoryInterface[]> {
    return this.http.get<ActivityCategoryInterface[]>(
      `${environment.apiUrl}/activityscategorys/`,
      { headers: this.httpHeaders }
    );
  }

  public fetchSingleActivityCategory(
    id: number
  ): Observable<ActivityCategoryInterface> {
    return this.http.get<ActivityCategoryInterface>(
      `${environment.apiUrl}/activityscategorys/` + id + '/',
      { headers: this.httpHeaders }
    );
  }

  public editActivityCategory(
    id: number,
    title: string,
    description: string,
    category: string
  ): Observable<ActivityCategoryInterface> {
    return this.http.patch<ActivityCategoryInterface>(
      `${environment.apiUrl}/activityscategorys/` + id + '/',
      { title, description, category },
      { headers: this.httpHeaders }
    );
  }

  public deleteActivityCategory(
    id: number
  ): Observable<ActivityCategoryInterface> {
    return this.http.delete<ActivityCategoryInterface>(
      `${environment.apiUrl}/activityscategorys/` + id + '/'
    );
  }
  public fetchActivityCategoryData(): Observable<ActivityCategoryInterface[]> {
    return this.http.get<ActivityCategoryInterface[]>(
      `${environment.apiUrl}/activityscategorys/`,
      { headers: this.httpHeaders }
    );
  }
}
