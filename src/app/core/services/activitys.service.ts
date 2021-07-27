import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

import { Activity } from "src/app/shared/models/activity.model";

@Injectable({providedIn:'root'})
export class ActivitysService{

  activityListChanged = new Subject<Activity[]>();

  private activityList: Activity[]= [
    new Activity(0, 'Slug', 'Title', 'Description', 'Activity Category', 'Created'),
    new Activity(1, 'Django Slug', 'Django Backend', 'Django interface with Angular Frontend', 'Official', 'Created')
  ]

  constructor(){

  }

  addActivityonList(activity: Activity){
    this.activityList.push(activity);
    this.activityListChanged.next(this.activityList.slice());

  }

  getActivitysList(){
    return this.activityList;
  }
}
