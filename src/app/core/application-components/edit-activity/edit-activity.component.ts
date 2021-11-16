import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestDataSource } from '@app/shared/data/rest.datasource';

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
    private dataSource: RestDataSource,
     ){
    this.activityList =[];
  }

  ngOnInit(): void {
    this.activityList = this.activitysService.getActivitysList();

  }

  onFetchActivityData(){
    this.dataSource.fetchActivityList().subscribe(
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
