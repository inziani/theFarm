import { Component, OnInit, Inject } from '@angular/core';

import { ActivityCategoryFormGroup } from '@app/profile/user-activity/models/activity-category-form.model';
import { Category } from '@app/shared/interfaces/activity-interface';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';
import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  formGroup = new ActivityCategoryFormGroup();
  isLoading = false;
  formSubmitted: boolean = false;
  activityCategory!: ActivityCategory;
  errorMessage!: string;
  title: string = 'Create task category';
  categorydata!: any;

  category: Category[] = [
    { value: 'Personal', viewValue: 'Personal' },
    { value: 'Official', viewValue: 'Official' },
  ];

  constructor(
    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogDataCategory: any
  ) {}

  ngOnInit(): void {}

  onAddActivityCategory() {
    this.dialogRef.close(this.formGroup.value);
    this.activityCategory = this.formGroup.value;
    this.dataSource
      .addActivityCategory(
        this.activityCategory.title,
        this.activityCategory.description,
        this.activityCategory.category
      )
      .subscribe({
        next: (newActivityCategory) => {
          this.dialog.open(ObjectCreatedComponent, {
            data: newActivityCategory,
          });
        },
        error: (err) => {
          this.errorMessage = err;
          this.isLoading = false;
        },
        complete: () => console.info('Completed'),
      });
  }
}
