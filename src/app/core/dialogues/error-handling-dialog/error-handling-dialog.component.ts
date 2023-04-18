import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessage } from '@app/core/shared/interfaces/http.interface';

@Component({
  selector: 'app-error-handling-dialog',
  templateUrl: './error-handling-dialog.component.html',
  styleUrls: ['./error-handling-dialog.component.css'],
})
export class ErrorHandlingDialogComponent implements OnInit {
  public errorMessageList!: string[];

  constructor(
    private matDialogConfig: MatDialogRef<ErrorHandlingDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: string []
  ) {
    this.errorMessageList = data;
  }

  ngOnInit(): void {}

  public close() {
    this.errorMessageList = this.errorMessageList.splice(
      0,
      this.errorMessageList.length
    );
    this.matDialogConfig.close();
  }
}
