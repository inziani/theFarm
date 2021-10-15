import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],

})
export class EditActivityComponent implements OnInit {

  activityObject = <Activity>{};
  activity!: Activity;
  error = null;
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
  // onAddActivity(newActivityFormData: {
  //   // id: number,
  //   title: string,
  //   description: string,
  //   slug: string,
  //   status: string,
  //   activity_category: string
  // })
  // {
  //   // this.activity.id = this.activityList.length+1
  //   // this.activity.slug = newActivityForm.value.newActivityData.slug;
  //   // this.activity.title = newActivityForm.value.newActivityData.title;
  //   // this.activity.description = newActivityForm.value.newActivityData.description;
  //   // this.activity.activityCategory = newActivityForm.value.newActivityData.activityCategory;
  //   // this.activity.status = newActivityForm.value.newActivityData.status;
  //   // const newActivity = new Activity(this.activity.id, this.activity.title, this.activity.slug, this.activity.description, this.activity.activityCategory, this.activity.status);
  //   // this.activitysService.addActivityonList(newActivity);
  //   // HTTP request - post data to Django REST API
  //   this.http.post(this.baseUrl+'/activitys/',newActivityFormData)
  //   .subscribe(responseData =>{
  //     console.log(responseData);
  //   })
  //   // newActivityForm.reset();
  // }

  onFetchActivityData(){
    this.activitysService.getActivityRequest().subscribe(
      data => {
        this.activityList = data;
      },
      error => {
        console.log(error);
      }
    )
  };

  onAddActivity(form: NgForm){
    const title = form.value.title;
    const slug = form.value.slug;
    const activityCategory = form.value.activityCategory;
    const description = form.value.description;
    const status = form.value.status;
    // console.log(form.value);
    this.activitysService.addNewActivity(title, slug, activityCategory, description, status).subscribe(data =>{
      console.log(data);
    },
    error =>{
      this.error = error.message;

    })
  };

  onDeleteActivity(){
    this.activitysService.deleteActivity().subscribe(()=>{
      this.activityList = [];
    });
  }

}
