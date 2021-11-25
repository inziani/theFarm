import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';

import { merge, Observable, observable, Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, _closeDialogVia } from '@angular/material/dialog';



import { RestDataSource } from '@app/shared/data/rest.datasource';
import { ActivitysService } from 'src/app/core/services/activitys.service';
import { Activity } from 'src/app/shared/models/activity.model';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],

})
export class TodoComponent implements OnInit, AfterViewInit {

  activity!: Activity;
  activityObject = <Activity>{};
  activityList!: Activity[];
  todaysDate = new Date();
  activityColumnHeaders: string[] = ['id', 'title', 'description','date_created', 'date_changed','status', 'maintenance', 'owner'];
  resultsLength = 0;
  sourceData = new MatTableDataSource<Activity>();
  filter = "";

  dialogueData: any;

  randomQuote!: any;

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
    this.onFetchRandomQuotes();
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

  onFetchRandomQuotes() {
    this.dataSource.fetchRandomQuotes().subscribe(
      quote => {
        console.log(quote);
        this.randomQuote = quote;

      });
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
  // editActivity(activity: Activity) {
  //   this.activitysService.getSingleActivityRequest(activity.id).subscribe(
  //     data => {
  //       console.log(data);
  //       this.activityObject = data;
  //       // this.activity.id = data.id;
  //       console.log(this.activityObject);
  //       // console.log(this.activityObject.id);
  //       console.log(this.activityObject.title);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // };

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'

    const dialogRef = this.dialogue.open(EditActivityComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(newActivity => {
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
