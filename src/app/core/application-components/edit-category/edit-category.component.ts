import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';

import { ActivityCategoryFormGroup } from '@app/core/shared/models/activity-category-form.model';
import { Category } from '@app/core/shared/interfaces/activity-interface';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { ActivityCategory } from '@app/core/shared/models/activity-category.models';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  public formGroup = new ActivityCategoryFormGroup();
  public isLoading = false;
  public formSubmitted: boolean = false;
  public activityCategory!: ActivityCategory;
  public title: string = 'Edit task category';
  public errorMessage!: string;

  category: Category[] = [
    { value: 'Personal', viewValue: 'Personal' },
    { value: 'Official', viewValue: 'Official' },
  ];

  constructor(
    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogDataCategory: any
  ) {}

  ngOnInit(): void {
    this.formGroup.patchValue(this.dialogDataCategory);
  }

  public onEditActivityCategory() {
    this.dialogRef.close(this.formGroup.value);
    this.activityCategory = this.formGroup.value;
    this.dataSource
      .editActivityCategory(
        this.dialogDataCategory.id,
        this.activityCategory.title,
        this.activityCategory.description,
        this.activityCategory.category
      )
      .subscribe({
        next: (activityCategoryChanged) =>
          this.dialog.open(ChangesSavedDialogComponent, {
            data: activityCategoryChanged.title,
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Completed'),
      });
  }
}
