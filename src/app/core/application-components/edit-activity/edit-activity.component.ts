import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { map } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



import { ActivitysService } from '@app/core/services/activitys.service';
import { Activity } from '@app/core/shared/models/activity.model';
import { ActivityCategoryInterface } from '@app/core/shared/interfaces/activity-interface';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { Status } from '@app/core/shared/interfaces/activity-interface';
import { ActivityFormGroup, ActivityFormControl } from '@app/core/shared/models/activityform-model';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';


@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],

})
export class EditActivityComponent implements OnInit {

  public selectedValue: any;
  public title: string = "Edit Task";
  public activityCategory!: ActivityCategoryInterface[];
  public activity!: Activity;
  public isLoading = false;
  public formSubmitted: boolean = false;
  public error!: string;
  public activityList!: Activity[];
  public status: Status[] = [
    { value: 'Created', viewValue: 'Created' },
    { value: 'Work in progress', viewValue: 'Work in progress' },
    { value: 'Completed', viewValue: 'Completed' },
    { value: 'Closed', viewValue: 'Closed' }
  ];
  public formGroup = new ActivityFormGroup();

  constructor(
    private activitysService: ActivitysService,
    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogDataActivity: any
  ) {

    // console.log(this.dialogDataActivity, '- Dialogue Data');
  }

  ngOnInit(): void {
    this.activityList = this.activitysService.getActivitysList();
    this.dataSource.fetchActivityCategory().subscribe(category => {
      this.activityCategory = category;
      // console.log(this.activityCategory);

    });
    this.formGroup.patchValue(this.dialogDataActivity);
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

  onEditActivity() {
    this.dialogRef.close(this.formGroup.value);
    this.activity = this.formGroup.value;
    this.dataSource.editActivity(this.dialogDataActivity.id, this.activity.title, this.activity.description, this.activity.status, this.activity.activity_category).subscribe(success => {
      if (success) {
        this.dialog.open(ChangesSavedDialogComponent);
      }
    },
      error => {
        this.error = 'The activity was not added.';
        alert(this.error);
        this.isLoading = false;
      }
    );
};

  close() {
    this.dialogRef.close();
  }

  submitForm() {
    // console.log('dialogue data');
  }

  onDeleteActivity(){
    this.activitysService.deleteActivity().subscribe(()=>{
      this.activityList = [];
    });
  }

}
