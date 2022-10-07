import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UsersService } from '@app/core/services/users.service';
import { UserUpdateFormGroup } from '@app/core/shared/models/user-update-form.model';
import { User } from '@app/core/shared/models/user.model';
import { ObjectCreatedComponent } from '../object-created/object-created.component';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {
  public userAction!: string;
  public errorMessage!: string;
  public formGroup = new UserUpdateFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public staffUser!: User;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserUpdateDialogComponent>
  ) { }

  ngOnInit(): void {
    this.userService.data.subscribe({
      next: (userAction) => this.userAction = userAction,
      error: (err) => this.errorMessage = err,
      complete: () => console.log('Complete')
    })

  }

  onAddUser() {

    // Fetch data from the form and pass it along

    this.dialogRef.close(this.formGroup.value);
    this.staffUser = this.formGroup.value;

    // Post the data to the API for Posting
    
    this.userService.addUser(
      this.staffUser.username,
      this.staffUser.email,
      this.staffUser.first_name,
      this.staffUser.middle_name,
      this.staffUser.last_name,
      this.staffUser.phone_number,
      this.staffUser.date_of_birth,
      this.staffUser.gender,
      this.staffUser.city,
      this.staffUser.country,
      this.staffUser.is_active,
      this.staffUser.is_superuser,
      this.staffUser.is_staff
    ).subscribe({
      next: (userCreated) => this.dialog.open(ObjectCreatedComponent, {
        data:
          this.staffUser.username = userCreated.username
      }),
      error: (err) => this.errorMessage = err,
      complete: ()=> console.log('Complete')
    })
  }
}
