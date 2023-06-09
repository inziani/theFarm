import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Activity } from '@app/profile/todo/models/activity.model';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { Status } from '@app/shared/interfaces/activity-interface';
import { ActivityFormGroup } from '@app/profile/todo/models/activityform-model';
import { ActivityCategoryInterface } from '@app/shared/interfaces/activity-interface';
import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';

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
  public activityCategory!: ActivityCategoryInterface[];
  public status: Status[] = [
    { value: 'Created', viewValue: 'Created' },
    { value: 'Work in progress', viewValue: 'Work in progress' },
    { value: 'Completed', viewValue: 'Completed' },
    { value: 'Closed', viewValue: 'Closed' },
  ];
  public formGroup = new ActivityFormGroup();
  public errorMessage!: string;

  constructor(
    private _dataSource: RestDataSource,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<CreateActivityComponent>
  ) {}

  ngOnInit(): void {
    this._dataSource.fetchActivityCategory().subscribe((category) => {
      this.activityCategory = category;
    });
  }

  onAddActivity() {
    this._dialogRef.close(this.formGroup.value);
    this.activity = this.formGroup.value;
    this._dataSource
      .addActivity(
        this.activity.title,
        this.activity.description,
        this.activity.status,
        this.activity.activity_category
      )
      .subscribe({
        next: (newActivity) => {
          this._dialog.open(ObjectCreatedComponent, { data: newActivity });
        },
        error: (err) => {
          this.errorMessage = err;
          this.isLoading = false;
        },
        complete: () => console.info('Completed'),
      });
  }

  close() {
    this._dialogRef.close();
  }
}
