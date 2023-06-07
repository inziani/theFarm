import { Component, Inject, OnInit } from '@angular/core';

import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { ActivityCategory } from '@app/core/shared/models/activity-category.models';
import { Activity } from '@app/core/shared/models/activity.model';
import { ChangesSavedDialogComponent } from '../changes-saved-dialog/changes-saved-dialog.component';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.css']
})
export class DeleteCategoryDialogComponent implements OnInit {

  public title: string = 'Delete Activity Category';
  public error!: string;
  public isLoading: boolean = false;
  public activityCategory!: ActivityCategory;
  public activity!: Activity;

  constructor(

    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteCategoryDialogData: any,


  ) {}

  ngOnInit(): void {

    this.activityCategory = this.deleteCategoryDialogData;


  }

  onDeleteActivityCategory() {
    this.dataSource.deleteActivityCategory(this.activityCategory.id).subscribe(success => {
      if (success) {
        console.log(success);
      }
      else {
        this.dialog.open(ChangesSavedDialogComponent);

      }
    },
      error => {
        this.error = 'The transaction was not successful';
        alert(this.error);
        this.isLoading = false;
      },

    );

  }


}
