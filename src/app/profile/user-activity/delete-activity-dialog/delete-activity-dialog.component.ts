import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from '@app/profile/user-activity/models/activity.model';
import { DeleteDialogComponent } from '@app/shared/user-feedback-dialogues/delete-dialog/delete-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityPageActions } from '@app/profile/store/actions/activity.actions';

@Component({
  selector: 'app-delete-activity-dialog',
  templateUrl: './delete-activity-dialog.component.html',
  styleUrls: ['./delete-activity-dialog.component.css'],
})
export class DeleteActivityDialogComponent implements OnInit {
  public title: string = 'Delete Activity';
  public error!: string;
  public isLoading: boolean = false;
  public activity!: Activity;

  ngOnInit(): void {
    this.activity = this.deleteActivityDialogData;
  }

  public onDeleteActivity() {
    this._store.dispatch(
      ActivityPageActions['[ActivityPage]DeleteActivity']({
        activityId: this.activity.id,
      })
    );
    this._dialog.open(DeleteDialogComponent, {
      data: this.activity.title,
    });
  }

  constructor(
    private _dialog: MatDialog,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA)
    public deleteActivityDialogData: Activity
  ) {}
}
