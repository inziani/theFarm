import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivityCategoryFormGroup } from '@app/core/shared/models/activity-category-form.model';
import { Category } from '@app/core/shared/interfaces/activity-category';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { ActivityCategory } from '@app/core/shared/models/activity-category.models';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  formGroup = new ActivityCategoryFormGroup();
  isLoading = false;
  formSubmitted: boolean = false;
  activityCategory!: ActivityCategory;
  error!: string;
  title: string = 'Edit task category';
  categorydata!: any;


  category: Category[] = [
    { value: 'Personal', viewValue: 'Personal' },
    { value: 'Official', viewValue: 'Official' }
  ];

  constructor(
    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogDataCategory: any

  ) {

  }

  ngOnInit(): void {
    this.formGroup.patchValue(this.dialogDataCategory);
  }

  onEditActivityCategory() {
    this.dialogRef.close(this.formGroup.value);
    this.activityCategory = this.formGroup.value;
    console.log('Activity Category on form information -',this.activityCategory);
    this.dataSource.editActivityCategory(this.dialogDataCategory.id, this.activityCategory.title, this.activityCategory.description, this.activityCategory.category).subscribe(success => {
      if (success) {
        this.dialog.open(ChangesSavedDialogComponent);

      }
    },
      error => {
        this.error = 'Transaction failed, changes not saved';
        alert(this.error);
        this.isLoading = false;
      },

    );

  }

}
