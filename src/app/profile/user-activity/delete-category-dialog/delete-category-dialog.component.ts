import { Component, Inject, OnInit } from '@angular/core';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { RestDataSource } from '@app/shared/data/rest.datasource';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';
import { Activity } from '@app/profile/user-activity/models/activity.model';
import { ChangesSavedDialogComponent } from '../../../shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { Store } from '@ngrx/store';
import { DeleteDialogComponent } from '@app/shared/user-feedback-dialogues/delete-dialog/delete-dialog.component';
import { ActivityCategoryPageActions } from '@app/profile/store/actions/activity-category.actions';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.css'],
})
export class DeleteCategoryDialogComponent implements OnInit {
  public title: string = 'Delete Activity Category';
  public error!: string;
  public isLoading: boolean = false;
  public activityCategory!: ActivityCategory;
  public activity!: Activity;

  ngOnInit(): void {
    this.activityCategory = this.deleteCategoryDialogData;
    console.log('Deletion -', this.activityCategory);
  }

  onDeleteActivityCategory() {
    this._store.dispatch(
      ActivityCategoryPageActions[
        '[ActivityCategoryPage]DeleteActivityCategory'
      ]({
        activityCategoryId: this.activityCategory.id,
      })
    );
    this._dialog.open(DeleteDialogComponent, {
      data: this.activityCategory.title,
    });
  }

  constructor(
    private _dialog: MatDialog,
    private _store: Store,
    private _dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteCategoryDialogData: ActivityCategory
  ) {}
}
