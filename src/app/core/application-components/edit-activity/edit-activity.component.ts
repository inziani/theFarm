import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { MatDialogActions } from "@angular/material/dialog";
import { MatDialogClose } from "@angular/material/dialog";
import { MatDialogTitle } from "@angular/material/dialog";

import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { ActivityCategoryInterface } from '@app/shared/interfaces/activity-category';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { Status } from '@app/shared/interfaces/activity-status';
import { ActivityFormGroup, ActivityFormControl } from '@app/shared/models/activityform-model';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],

})
export class EditActivityComponent implements OnInit {

  activityCategory!: ActivityCategoryInterface[];
  activity: Activity = new Activity('title', 'description', 'activity_category', 'owner', 'status')
  isLoading = false;
  formSubmitted: boolean = false;

  error = null;
  activityList: Activity[];

  status: Status[] = [
    { value: 'Created', viewValue: 'Created'},
    { value: 'Work in progress', viewValue: 'Work in progress' },
    { value: 'Completed',viewValue: 'Completed' },
    { value: 'Closed' , viewValue: 'Closed'}
  ];

 formGroup = new ActivityFormGroup();

  constructor(
    private activitysService: ActivitysService,
    private dataSource: RestDataSource,
     ){
    this.activityList =[];
  }

  ngOnInit(): void {
    this.activityList = this.activitysService.getActivitysList();
    this.dataSource.fetchActivityCategory().subscribe(category => {
      this.activityCategory = category;
      console.log(this.activityCategory);
    })


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

  submitForm() {

  }

  onDeleteActivity(){
    this.activitysService.deleteActivity().subscribe(()=>{
      this.activityList = [];
    });
  }

}
