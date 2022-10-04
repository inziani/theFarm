import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-handling-dialog',
  templateUrl: './error-handling-dialog.component.html',
  styleUrls: ['./error-handling-dialog.component.css']
})
export class ErrorHandlingDialogComponent implements OnInit {

  constructor(
    private matDialogConfig: MatDialogRef<ErrorHandlingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public errorMessage: string

  ) {}

  ngOnInit(): void {
  this.errorMessage;
  }

  close() {
    this.matDialogConfig.close();
  }

}
