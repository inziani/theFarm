import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { UserProfileInterface } from '@app/core/shared/interfaces/users-interface';
import { User, UserProfile } from '@app/core/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
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
    'delete'
  ];
  public userList: User[] = [];
  public errorMessage!: string;
  public sourceData = new MatTableDataSource<User>();
  public resultsLength = 0;


  constructor(
    private dataSource: RestDataSource,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource.fetchUsers().subscribe({
      next: (userList) => this.sourceData.data = userList,
      error: (err) => this.dialog.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err, }),
      complete: () => console.info('complete')
    });
  }
  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public addUser(add: string) {

  }
  public searchUser() {

  }

  public onDisplayUser(userAction: string, id: number){

  }

  public onDeleteUser(userAction: string, id: number) {

  }

  public onEditUser(userAction: string, id: number) {

  }
}
