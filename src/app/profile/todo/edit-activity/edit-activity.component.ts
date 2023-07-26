import { Component, Inject, OnInit } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Activity } from '@app/profile/todo/models/activity.model';
import { Status } from '@app/shared/interfaces/activity-interface';
import { ActivityFormGroup } from '@app/profile/todo/models/activityform-model';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityState } from '../../store/state/profile.state';
import * as ActivityActions from '../../store/actions/profile.actions';
import * as ActivitySelectors from '../../store/selectors/profile.selectors'
import { ActivityCategory } from '../models/activity-category.models';

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
    // this._activitysService.fetchActivityCategory().subscribe((category) => {
    //   this.activityCategory = category;
    // });
    this._store.dispatch(ActivityActions.ActivityCategoryActions['[ActivityCategory]RetrieveActivityCategoryList']());
    this._store.select(ActivitySelectors.getActivityCategoryList).subscribe({
      next: (activityCategoryList) => {
        this.activityCategoryList = activityCategoryList
        console.log('Tired of State -', this.activityCategoryList);
      },
      error: (err) => this.errorMessage = err,
      complete:()=> console.info('Completed')
    });
    this.formGroup.patchValue(this.dialogDataActivity);
  }


  public onEditActivity() {
    // this._dialogRef.close(this.formGroup.value);
    this.activity = this.formGroup.value;
    this._store.dispatch(
      ActivityActions.ActivityActions['[Activity]EditActivity']({
        activity: this.activity,
      })
    );
    // this._dialogRef.close();
    this._dialog.open(ChangesSavedDialogComponent, {
      data: this.activity.title,
    });
    // this._dialogRef
    //   .afterClosed()
    //   .pipe(take(1))
    //   .subscribe((result) => {
    //     console.log('Dialogue close in Tasks-', result);
    //   });

    // this._activitysService
    //   .editActivity(
    //     this.dialogDataActivity.id,
    //     this.activity.title,
    //     this.activity.description,
    //     this.activity.status,
    //     this.activity.activity_category
    //   )
    //   .subscribe({
    //     next: (activityChanged) =>
    //       this._dialog.open(ChangesSavedDialogComponent, {
    //         data: activityChanged.title,
    //       }),
    //     error: (err) => (this.errorMessage = err),
    //     complete: () => console.info('Completed'),
    //   });
  }

  public close() {
    this._dialogRef.close();
  }
}
