import { Component, Inject, OnInit } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Activity } from '@app/profile/user-activity/models/activity.model';
import { Status } from '@app/shared/interfaces/activity-interface';
import { ActivityFormGroup } from '@app/profile/user-activity/models/activityform-model';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityState } from '../../store/state/activity.state';
import { ActivityPageActions } from '../../store/actions/activity.actions';
import { ActivityCategory } from '../models/activity-category.models';
import { selectActivityCategories } from '../../store/selectors/activity-category.selectors';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],
})
export class EditActivityComponent implements OnInit {
  public selectedValue: any;
  public title: string = 'Edit Task';
  public activityCategoryList!: ActivityCategory[];
  public activity!: Activity;
  public isLoading = false;
  public formSubmitted: boolean = false;
  public errorMessage!: string;
  public activityList!: Activity[];
  public status: Status[] = [
    { value: 'Created', viewValue: 'Created' },
    { value: 'Work in progress', viewValue: 'Work in progress' },
    { value: 'Completed', viewValue: 'Completed' },
    { value: 'Closed', viewValue: 'Closed' },
  ];
  public formGroup = new ActivityFormGroup();

  constructor(
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<EditActivityComponent>,
    private _store: Store<ActivityState>,
    @Inject(MAT_DIALOG_DATA) public dialogDataActivity: any
  ) {}

  ngOnInit(): void {
    this._store.dispatch(ActivityPageActions['[ActivityPage]LoadActivities']());
    this._store.select(selectActivityCategories).subscribe({
      next: (activityCategories) => {
        this.activityCategoryList = activityCategories;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
    this.formGroup.patchValue(this.dialogDataActivity);
  }

  public onEditActivity() {
    this.activity = this.formGroup.value;
    this._store.dispatch(
      ActivityPageActions['[ActivityPage]EditActivity']({
        activity: this.activity,
      })
    );
    this._dialog.open(ChangesSavedDialogComponent, {
      data: this.activity.title,
    });
  }

  public close() {
    this._dialogRef.close();
  }
}
