import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Activity } from '@app/profile/todo/models/activity.model';
import { Status } from '@app/shared/interfaces/activity-interface';
import { ActivityFormGroup } from '@app/profile/todo/models/activityform-model';
import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';
import { Store } from '@ngrx/store';
import { ActivityState } from '@app/profile/store/state/activity.state';
import { ActivityPageActions } from '@app/profile/store/actions/activity.actions';
import { selectActivityCategories } from '../../store/selectors/activity-category.selectors';
import { ActivityCategory } from '../models/activity-category.models';
import { ActivityCategoryPageActions } from '@app/profile/store/actions/activity-category.actions';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css'],
})
export class CreateActivityComponent implements OnInit {
  public activity!: Activity;
  public isLoading = false;
  public formSubmitted: boolean = false;
  public title: string = 'Create Task';
  public activityCategory!: ActivityCategory[];
  public status: Status[] = [
    { value: 'Created', viewValue: 'Created' },
    { value: 'Work in progress', viewValue: 'Work in progress' },
    { value: 'Completed', viewValue: 'Completed' },
    { value: 'Closed', viewValue: 'Closed' },
  ];
  public formGroup = new ActivityFormGroup();
  public errorMessage!: string;

  constructor(
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<CreateActivityComponent>,
    private _store: Store<ActivityState>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(
      ActivityCategoryPageActions[
        '[ActivityCategoryPage]LoadActivityCategories'
      ]()
    );
    this._store.select(selectActivityCategories).subscribe({
      next: (activityCategories) => {
        this.activityCategory = activityCategories;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  onAddActivity() {
    this.activity = this.formGroup.value;
    this._store.dispatch(
      ActivityPageActions['[ActivityPage]CreateActivity']({
        activity: this.activity,
      })
    );
    this._dialog.open(ObjectCreatedComponent, { data: this.activity.title });
  }

  close() {
    this._dialogRef.close();
  }
}
