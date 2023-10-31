import { Injectable, signal } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorHandlingDialogComponent } from '../../shared/user-feedback-dialogues/error-handling-dialog/error-handling-dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public isDialogOpen!: Boolean;
  private _dataSource$ = new BehaviorSubject<any>('');
  readonly _data: Observable<any> = this._dataSource$.asObservable();

  constructor(private _dialog: MatDialog) {}

  // Cross component communication
  public sendData(data: any) {
    this._dataSource$.next(data);
  }

  public openErrorHandlingDialog(data: string[] | string) {
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

  public logInErrorHandlingDialog(data: string) {
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
