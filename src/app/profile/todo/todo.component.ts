import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Observable, pipe, map, tap } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogConfig,
  _closeDialogVia,
} from '@angular/material/dialog';

import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Activity } from '@app/profile/todo/models/activity.model';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { MatTableDataSource } from '@angular/material/table';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { DeleteActivityDialogComponent } from '@app/shared/user-feedback-dialogues/delete-activity-dialog/delete-activity-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityState } from '../store/state/profile.state';
import * as ActivityActions from '../store/actions/profile.actions';
import * as ActivitySelectors from '../store/selectors/profile.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, AfterViewInit {
  public activity!: Activity;
  public activityObject = <Activity>{};
  public activityList$!: Observable<Activity[]>;
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

  constructor(
    private _activitysService: ActivitysService,
    private _dialogue: MatDialog,
    private _store: Store<ActivityState>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(
      ActivityActions.ActivityActions['[Activity]RetrieveActivityList']()
    );
    // this.activityList$ = this._store.select(ActivitySelectors.getActivityList);
    this._store.select(ActivitySelectors.getActivityList).subscribe({
      next: (activityList) => {
        this.sourceData.data = activityList;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.log('Complete'),
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
      console.log(newActivity);
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

    this._activitysService.fetchSingleActivity(id).subscribe((response) => {
      let activity = response;
      dialogConfig.data = activity;

      // ***Open dialog

      const dialogRef = this._dialogue.open(
        EditActivityComponent,
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
    });
  }

  openDeleteActivityDialog(id: number) {
    // ***create dialog object
    const dialogConfig = new MatDialogConfig();
    // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'

    // ****fetch data from the API
    this._activitysService.fetchSingleActivity(id).subscribe((response) => {
      let activity = response;
      dialogConfig.data = activity;

      // ***Open Dialog
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
    });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
