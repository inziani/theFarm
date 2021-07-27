import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],

})
export class EditActivityComponent implements OnInit {
  activity = {
    id: 0,
    title: '',
    slug: '',
    description: '',
    activityCategory:'',
    status: ''
  }

  activityList: Activity[];


  constructor(
    private activitysService: ActivitysService,
    private http: HttpClient ) {
    this.activityList =[];
  }

  ngOnInit(): void {
    this.activityList = this.activitysService.getActivitysList();

  }

  // addActivity(newActivityForm: NgForm)
  addActivity(newActivityFormData: {
    // id: number,
    title: string,
    description: string,
    slug: string,
    status: string,
    activity_category: string
  })
  {
    // this.activity.id = this.activityList.length+1
    // this.activity.slug = newActivityForm.value.newActivityData.slug;
    // this.activity.title = newActivityForm.value.newActivityData.title;
    // this.activity.description = newActivityForm.value.newActivityData.description;
    // this.activity.activityCategory = newActivityForm.value.newActivityData.activityCategory;
    // this.activity.status = newActivityForm.value.newActivityData.status;
    // const newActivity = new Activity(this.activity.id, this.activity.title, this.activity.slug, this.activity.description, this.activity.activityCategory, this.activity.status);
    // this.activitysService.addActivityonList(newActivity);
    // HTTP request - post data to Django REST API
    this.http.post('http://127.0.0.1:8000/activitys/',newActivityFormData)
    .subscribe(responseData =>{
      console.log(responseData);
    })
    // newActivityForm.reset();
  }

}
