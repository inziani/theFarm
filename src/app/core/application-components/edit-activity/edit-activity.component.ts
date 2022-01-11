import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { map } from 'rxjs/operators';

import { MatInput } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogActions } from "@angular/material/dialog";
import { MatDialogClose } from "@angular/material/dialog";
import { MatDialogTitle } from "@angular/material/dialog";
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  selectedValue: any;

  title: string = "Create new task";

  activityCategory!: ActivityCategoryInterface[];

  activity!: Activity;
    // = new Activity('title', 'description', 'activity_category', 'status')
  isLoading = false;
  formSubmitted: boolean = false;


  error!: string;
  activityList!: Activity[];

  status: Status[] = [
    { value: 'Created', viewValue: 'Created' },
    { value: 'Work in progress', viewValue: 'Work in progress' },
    { value: 'Completed', viewValue: 'Completed' },
    { value: 'Closed', viewValue: 'Closed' }
  ];

  formGroup = new ActivityFormGroup();

  constructor(
    private activitysService: ActivitysService,
    private dataSource: RestDataSource,
    private dialogRef: MatDialogRef<EditActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {

  }

  ngOnInit(): void {
    this.activityList = this.activitysService.getActivitysList();
    this.dataSource.fetchActivityCategory().subscribe(category => {
      this.activityCategory = category;
      // console.log(this.activityCategory);

    });
  }


  onFetchActivityData() {
    this.dataSource.fetchActivityList().subscribe(
      data => {
        this.activityList = data;
      },
      error => {
        console.log(error);
      }
    )
  };

  onAddActivity() {
    this.dialogRef.close(this.formGroup.value);
    this.activity = this.formGroup.value;
    this.dataSource.addActivity(this.activity.title, this.activity.description, this.activity.status, this.activity.activity_category).subscribe(success => {
      if (success) {
        // this.dialogue.open(LoginDialogComponent);
        // this.router.navigate(['home']);
        alert('Category added successfully');
        console.log(success);
      }
    },
      error => {
        this.error = 'The activity was not added.';
        alert(this.error);
        this.isLoading = false;
      }
    );
    // console.log(this.formGroup.value);
};


  close() {

    this.dialogRef.close();

  }





  // onAddActivity(form: NgForm){
  //   const title = form.value.title;
  //   const slug = form.value.slug;
  //   const activityCategory = form.value.activityCategory;
  //   const description = form.value.description;
  //   const status = form.value.status;
  //   // console.log(form.value);
  //   this.activitysService.addNewActivity(title, slug, activityCategory, description, status).subscribe(data =>{
  //     console.log(data);
  //   },
  //   error =>{
  //     this.error = error.message;

  //   })
  // };

  submitForm() {
    // console.log('dialogue data');

  }

  onDeleteActivity(){
    this.activitysService.deleteActivity().subscribe(()=>{
      this.activityList = [];
    });
  }

}
