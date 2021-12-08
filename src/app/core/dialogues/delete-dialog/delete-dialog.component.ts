import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { ActivityCategory } from '@app/shared/models/activity-category.models';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  title: string = 'Delete Category';
  receivedDeletionData: any;
  error!: string;
  isLoading: boolean = false;
  activityCategory!: ActivityCategory;

  constructor(

    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteDialogData: any

  ) {
  }

  ngOnInit(): void {
    this.activityCategory = this.deleteDialogData;
  }

  onDeleteActivityCategory() {
    this.dataSource.deleteActivityCategory(this.activityCategory.id).subscribe(success => {
      if (success) {
        this.dialog.open(LoginDialogComponent);
        // this.router.navigate(['home']);
        // console.log('delete call successful', success);
        // alert('delete call successful');
      }
    },
      error => {
        this.error = 'Login Unsuccessful! Try again';
        alert(this.error);
        this.isLoading = false;
      },

    );

  }

}
