import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogConfig,
  _closeDialogVia,
} from '@angular/material/dialog';

import { Activity } from '@app/profile/user-activity/models/activity.model';
import { EditActivityComponent } from '../../user-activity/edit-activity/edit-activity.component';
import { MatTableDataSource } from '@angular/material/table';
import { CreateActivityComponent } from '../../user-activity/create-activity/create-activity.component';
import { DeleteActivityDialogComponent } from '@app/profile/user-activity/delete-activity-dialog/delete-activity-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityState } from '../../store/state/activity.state';
import {
  selectAllActivities,
  selectActivityById,
} from '../../store/selectors/activity.selectors';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, AfterViewInit {

  public activity!: Activity;
  public activityObject = <Activity>{};
  public activityList$ = this._store.select(selectAllActivities);
  public errorMessage$!: Observable<string>;
  public todaysDate = new Date();
  public activityColumnHeaders: string[] = [
    'id',
    'title',
    'description',
    'date_created',
    'date_changed',
    'status',
    'edit',
    'delete',
    'owner',
  ];
  public resultsLength = 0;
  public sourceData = new MatTableDataSource<Activity>();
  public filter = '';
  public dialogueData: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public errorMessage!: string;

  ngOnInit(): void {
    this.activityList$.subscribe({
      next: (activityList) => (this.sourceData.data = activityList),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  doFilter(filterValue: any) {
    this.sourceData.filter = JSON.stringify(filterValue).trim().toLowerCase();
  }

  public openCreateActivityDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    const dialogRef = this._dialogue.open(
      CreateActivityComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((newActivity) => {
      if (newActivity == undefined) {
        return;
      } else {
        console.log('Editable Data after else button', newActivity);
      }
    });
  }

  public openEditActivityDialog(id: number) {
    // ***Create dialogue object
    const dialogConfig = new MatDialogConfig();
    // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    // *** Fetch data from api

    this._store.select(selectActivityById(id)).subscribe({
      next: (selectedActivity) => {
        dialogConfig.data = selectedActivity;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
    // **Open Dialog
    const dialogRef = this._dialogue.open(EditActivityComponent, dialogConfig);
    // ***Returned data from dialogue
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      } else {
        console.log('Editable Data after else button', result);
      }
    });
  }

  public openDeleteActivityDialog(id: number) {
    // ***Create dialogue object
    const dialogConfig = new MatDialogConfig();
    // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    // *** Fetch data from api

    this._store.select(selectActivityById(id)).subscribe({
      next: (selectedActivity) => {
        dialogConfig.data = selectedActivity;
        this.activity = selectedActivity!;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
    // **Open Dialog
    const dialogRef = this._dialogue.open(
      DeleteActivityDialogComponent,
      dialogConfig
    );
    // ***Returned data from dialogue
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      } else {
        console.log('Editable Data after else button', result);
      }
    });
  }

  ngOnDestroy() {}

  constructor(
    private _dialogue: MatDialog,
    private _store: Store<ActivityState>,
    private _activatedroute: ActivatedRoute
  ) {}
}
