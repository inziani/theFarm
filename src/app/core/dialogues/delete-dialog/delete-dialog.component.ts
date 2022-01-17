import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RestDataSource } from '@app/shared/data/rest.datasource';
import { ActivityCategory } from '@app/shared/models/activity-category.models';
import { Activity } from '@app/shared/models/activity.model';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  public title: string = 'Delete Category';
  public receivedDeletionData: any;
  public error!: string;
  public isLoading: boolean = false;
  public activityCategory!: ActivityCategory;
  public activity!: Activity;

  constructor(

    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    // @Inject(MAT_DIALOG_DATA) public deleteActivityDialogData: any

  ) {
    console.log('Category - ', this.deleteData);
    console.log('Activity - ', this.deleteData);
  }

  ngOnInit(): void {
    this.receivedDeletionData = this.deleteData;
    this.activityCategory = this.deleteData;
    this.activity = this.deleteData;
  }

  onDeleteActivityCategory() {
    this.dataSource.deleteActivityCategory(this.activityCategory.id).subscribe(success => {
      if (success) {
        this.dialog.open(LoginDialogComponent);

      }
    },
      error => {
        this.error = 'Login Unsuccessful! Try again';
        alert(this.error);
        this.isLoading = false;
      },

    );

  }

  onDeleteActivity() {
    this.dataSource.deleteActivity(this.activity.id).subscribe(sucess => {
      if (sucess) {
        this.dialog.open(LoginDialogComponent);
      }
    },
      error => {
        this.error = 'The trasaction failed. Please check';
        alert(this.error)
      });
  }

}
