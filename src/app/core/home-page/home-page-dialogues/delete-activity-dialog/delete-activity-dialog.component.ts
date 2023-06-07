import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { Activity } from '@app/core/shared/models/activity.model';
import { ChangesSavedDialogComponent } from '../changes-saved-dialog/changes-saved-dialog.component';

@Component({
  selector: 'app-delete-activity-dialog',
  templateUrl: './delete-activity-dialog.component.html',
  styleUrls: ['./delete-activity-dialog.component.css']
})
export class DeleteActivityDialogComponent implements OnInit {
  public title: string = 'Delete Activity';
  public error!: string;
  public isLoading: boolean = false;
  public activity!: Activity;

  constructor(
    private dataSource: RestDataSource,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteActivityDialogData: any,

  ) { }

  ngOnInit(): void {
    this.activity = this.deleteActivityDialogData;

  }

  onDeleteActivity() {
    this.dataSource.deleteActivity(this.activity.id).subscribe(sucess => {
      if (sucess) {

        console.log(sucess)
      }
      else {
        this.dialog.open(ChangesSavedDialogComponent);

      }
    },
      error => {
        this.error = 'The transaction failed. Please check';
        alert(this.error)
      });
  }

}
