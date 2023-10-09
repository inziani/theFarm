import { Component, OnInit, Inject } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ActivityCategoryFormGroup } from '@app/profile/user-activity/models/activity-category-form.model';
import { Category } from '@app/shared/interfaces/activity-interface';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityCategoryPageActions } from '@app/profile/store/actions/activity-category.actions';

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

  ngOnInit(): void {
    this.formGroup.patchValue(this.dialogDataCategory);
  }

  public onEditActivityCategory() {
    this.activityCategory = this.formGroup.value;
    this._store.dispatch(
      ActivityCategoryPageActions['[ActivityCategoryPage]EditActivityCategory'](
        {
          activityCategory: this.activityCategory,
        }
      )
    );
    this._dialog.open(ChangesSavedDialogComponent, {
      data: this.activityCategory.title,
    });
  }

  public close() {
    this._dialogRef.close();
  }

  constructor(
    private _store: Store,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogDataCategory: ActivityCategory
  ) {}
}
