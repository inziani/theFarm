import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { User, UserProfile } from '@app/authentication/models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorHandlingDialogComponent } from '@app/shared/user-feedback-dialogues/error-handling-dialog/error-handling-dialog.component';
import { UsersService } from '@app/_helpers/services/users.service';
import { UserUpdateDialogComponent } from '@app/shared/user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})
export class BioComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public userProfilesList: UserProfile[] = [];
  public userColumnHeaders: string[] = [
    'id',
    'username',
    'email',
    'first_name',
    'middle_name',
    'last_name',
    'phone_number',
    'date_of_birth',
    'gender',
    'city',
    'country',
    'is_active',
    'is_superuser',
    'is_staff',
    'date_joined',
    'display',
    'edit',
    'delete',
  ];
  public userList: User[] = [];
  public errorMessage!: string;
  public sourceData = new MatTableDataSource<User>();
  public resultsLength = 0;
  public userAction!: string;
  public singleUser!: User;
  public clickedRow = new Set<User>();

  constructor(private _dialog: MatDialog, private _userService: UsersService) {}

  ngOnInit(): void {
    this._userService.fetchUsers().subscribe({
      next: (userList) => (this.sourceData.data = userList),
      error: (err) =>
        this._dialog.open(ErrorHandlingDialogComponent, {
          data: (this.errorMessage = err),
        }),
      complete: () => console.info('complete'),
    });
  }
  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public addUser(userAction: string) {
    this._userService.sendData(userAction);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // OpenDialog

    let dialogRef = this._dialog.open(UserUpdateDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        return response;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sourceData.filter = filterValue.trim().toLowerCase();
  }

  public searchUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sourceData.filter = filterValue.trim().toLowerCase();
  }

  public onDisplayUser(userAction: string, id: number) {
    this._userService.sendData(userAction);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // Fetch Data from API
    this._userService.fetchSingleUser(id).subscribe({
      next: (singleUser) => {
        this.singleUser = singleUser;
        dialogConfig.data = this.singleUser;
        let dialogRef = this._dialog.open(
          UserUpdateDialogComponent,
          dialogConfig
        );
        dialogRef.afterClosed().subscribe({
          next: (response) => {
            return response;
          },
          error: (err) => (this.errorMessage = err),
          complete: () => console.info('Complete'),
        });
      },
      error: (err) =>
        this._dialog.open(ErrorHandlingDialogComponent, {
          data: (this.errorMessage = err),
        }),
      complete: () => console.info('Complete'),
    });
  }

  public onDeleteUser(userAction: string, id: number) {
    this._userService.sendData(userAction);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // OpenDialog and connect to the API

    this._userService.fetchSingleUser(id).subscribe({
      next: (deleteUser) => {
        this.singleUser = deleteUser;
        dialogConfig.data = this.singleUser;
        let dialogRef = this._dialog.open(
          UserUpdateDialogComponent,
          dialogConfig
        );
        dialogRef.afterClosed().subscribe({
          next: (response) => {
            return response;
          },
          error: (err) =>
            this._dialog.open(ErrorHandlingDialogComponent, {
              data: (this.errorMessage = err),
            }),
          complete: () => console.info('Complete'),
        });
      },
    });
  }

  public onEditUser(userAction: string, id: number) {
    this._userService.sendData(userAction);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // Open API to fetch single User Data

    this._userService.fetchSingleUser(id).subscribe({
      next: (changedUser) => {
        this.singleUser = changedUser;
        dialogConfig.data = this.singleUser;
        let dialogRef = this._dialog.open(
          UserUpdateDialogComponent,
          dialogConfig
        );
        dialogRef.afterClosed().subscribe({
          next: (response) => {
            return response;
          },
          error: (err) => (this.errorMessage = err),
          complete: () => console.info('Complete'),
        });
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }
}
