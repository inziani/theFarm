import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

import { Activity } from "src/app/shared/models/activity.model";

@Injectable({providedIn:'root'})
export class ActivitysService{

  activityListChanged = new Subject<Activity[]>();

  private activityList: Activity[]= [
    new Activity(0, 'One', 'Subscription'),
    new Activity(1, 'Two', 'Subject')
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
