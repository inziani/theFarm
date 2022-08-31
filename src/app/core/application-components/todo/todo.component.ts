import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';

import { merge, Observable, observable, Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, _closeDialogVia } from '@angular/material/dialog';



import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { ActivitysService } from '@app/core/services/activitys.service';
import { Activity } from '@app/core/shared/models/activity.model';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { MatTableDataSource } from '@angular/material/table';
import { CreateActivityComponent } from '../create-activity/create-activity.component';
import { DeleteCategoryDialogComponent } from '@app/core/dialogues/delete-category-dialog/delete-category-dialog.component';
import { DeleteActivityDialogComponent } from '@app/core/dialogues/delete-activity-dialog/delete-activity-dialog.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],

})
export class TodoComponent implements OnInit, AfterViewInit {

  public activity!: Activity;
  public activityObject = <Activity>{};
  public activityList!: Activity[];
  public todaysDate = new Date();
  public activityColumnHeaders: string[] = ['id', 'title', 'description','date_created', 'date_changed','status', 'maintenance', 'owner'];
  public resultsLength = 0;
  public sourceData = new MatTableDataSource<Activity>();
  public filter = "";

  public dialogueData: any;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private subscription!: Subscription;


  constructor(

    private activitysService: ActivitysService,
    private dataSource: RestDataSource,
    private dialogue: MatDialog) {

  }

  ngOnInit(): void {
    // this.fetchActivityData();
    this.onFetchActivityData();
    this.activityList = this.activitysService.getActivitysList();
    this.subscription = this.activitysService.activityListChanged.subscribe(
      (activityList: Activity[]) => {
        this.activityList = activityList;
      }
    )

    this.dataSource.fetchActivityList().subscribe(activityList =>
      this.sourceData.data = activityList);

  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;

  }

  doFilter(filterValue: any) {
    this.sourceData.filter = (JSON.stringify(filterValue)).trim().toLowerCase();
    console.log(filterValue);

  }


  onFetchActivityData() {
    this.dataSource.fetchActivityList().subscribe(
      activityList => {
        this.activityList = activityList;
        console.log(this.activityList);

      },
      error => {
        console.log(error);
      }
    )
  }

  openCreateActivityDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'

    const dialogRef = this.dialogue.open(CreateActivityComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(newActivity => {
    })
  };

  openEditActivityDialog(id: number) {
    // ***Create dialogue object
    const dialogConfig = new MatDialogConfig();
    // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    // *** Fetch data from api

    this.dataSource.fetchSingleActivity(id).subscribe((response) => {
      let activity = response;
      dialogConfig.data = activity;
      console.log(activity);

      // ***Open dialog

      const dialogRef = this.dialogue.open(EditActivityComponent, dialogConfig);

      // ***Returned data from dialogue

      dialogRef.afterClosed().subscribe(result => {

        if (result == undefined) {
          return;
        }
        else {

          console.log('Editable Data after else button', result);

        }

      });

    });

  };

  openDeleteActivityDialog(id: number) {
        // ***create dialog object
    const dialogConfig = new MatDialogConfig();
    // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'

    // ****fetch data from the API
    this.dataSource.fetchSingleActivity(id).subscribe((response) => {
      let activity = response;
      dialogConfig.data = activity;

      // ***Open Dialog
      const dialogRef = this.dialogue.open(DeleteActivityDialogComponent, dialogConfig);

      // ***Returned data from dialogue
      dialogRef.afterClosed().subscribe(result => {

        if (result == undefined) {
          return;
        }
        else {

          console.log('Editable Data after else button', result);

        }

      });

    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
