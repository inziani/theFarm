import { Component, Inject, OnInit } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Activity } from '@app/profile/todo/models/activity.model';
import { ActivityCategoryInterface } from '@app/shared/interfaces/activity-interface';
// import { RestDataSource } from '@app/shared/data/rest.datasource';
import { Status } from '@app/shared/interfaces/activity-interface';
import { ActivityFormGroup } from '@app/profile/todo/models/activityform-model';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityState } from '../../store/state/profile.state';
import * as ActivityActions from '../../store/actions/profile.actions';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],
})
export class EditActivityComponent implements OnInit {
  public selectedValue: any;
  public title: string = 'Edit Task';
  public activityCategory!: ActivityCategoryInterface[];
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
    private _activitysService: ActivitysService,
    // private _dataSource: RestDataSource,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<EditActivityComponent>,
    private _store: Store<ActivityState>,
    @Inject(MAT_DIALOG_DATA) public dialogDataActivity: any
  ) {}

  ngOnInit(): void {
    this._activitysService.fetchActivityCategory().subscribe((category) => {
      this.activityCategory = category;
    });
    this.formGroup.patchValue(this.dialogDataActivity);
  }

  public onFetchActivityData() {
    this._activitysService.fetchActivityData().subscribe({
      next: (data) => {
        this.activityList = data;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  public onEditActivity() {
    this._dialogRef.close(this.formGroup.value);
    this.activity = this.formGroup.value;
    console.log('activity', this.activity);
    this._store.dispatch(
      ActivityActions.ActivityActions['[Activity]EditActivity']({
        activity: this.activity,
      })
    );
    this._dialog.openDialogs(
      ChangesSavedDialogComponent, data: {this.activity.title});

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
