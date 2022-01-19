
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { ActivityCategoryFormGroup } from '@app/core/shared/models/activity-category-form.model';
import { Category } from '@app/core/shared/interfaces/activity-category';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityCategory } from '@app/core/shared/models/activity-category.models';
import { MatTable } from '@angular/material/table';
import { LoginDialogComponent } from '@app/core/dialogues/login-dialog/login-dialog.component';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {


  formGroup = new ActivityCategoryFormGroup();
  isLoading = false;
  formSubmitted: boolean = false;
  activityCategory!: ActivityCategory;
  error!: string;
  title: string = 'Create task category';
  categorydata!: any;


  category: Category[] = [
    { value: 'Personal', viewValue: 'Personal' },
    { value: 'Official', viewValue: 'Official' }
  ];


  constructor(
    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogDataCategory: any
  ) { }

  ngOnInit(): void {
  }

  onAddActivityCategory() {
    this.dialogRef.close(this.formGroup.value);
    this.activityCategory = this.formGroup.value;
    this.dataSource.addActivityCategory(this.activityCategory.title, this.activityCategory.description, this.activityCategory.category).subscribe(success => {
      if (success) {
        this.dialog.open(ChangesSavedDialogComponent);
      }
    },
      error => {
        this.error = 'Login Unsuccessful! Try again';
        alert(this.error);
        this.isLoading = false;
      }
    );
};


}
