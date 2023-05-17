import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { ErrorHandlingDialogComponent } from '../dialogues/error-handling-dialog/error-handling-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class ErrorService   {
  public isDialogOpen!: Boolean;

  constructor(
    private _dialog: MatDialog,
  ) { }

  public openErrorHandlingDialog(data: string[]) {
    this.isDialogOpen = true;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = data;

    const dialogRef = this._dialog.open(
      ErrorHandlingDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log('The dialog is closed');
        this.isDialogOpen = false;
        let animal;
        animal = result;
      },
    });
  }
}
