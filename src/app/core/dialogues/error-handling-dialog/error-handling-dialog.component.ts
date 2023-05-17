import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
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
