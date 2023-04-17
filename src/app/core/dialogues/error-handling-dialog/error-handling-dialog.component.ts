import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-handling-dialog',
  templateUrl: './error-handling-dialog.component.html',
  styleUrls: ['./error-handling-dialog.component.css'],
})
export class ErrorHandlingDialogComponent implements OnInit {
  public errorMessage!:
    {
      reason: { detail: string },
      status: number
    }


  constructor(
    private matDialogConfig: MatDialogRef<ErrorHandlingDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { reason: { detail: string }; status: number }
  ) {
    this.errorMessage = data;
    console.log('Error Data - ', data);
  }

  ngOnInit(): void {}

  close() {
    this.matDialogConfig.close();
  }
}
