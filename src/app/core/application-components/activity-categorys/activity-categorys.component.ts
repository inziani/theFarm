import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { ActivityCategory } from '@app/shared/models/activity-category.models';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-activity-categorys',
  templateUrl: './activity-categorys.component.html',
  styleUrls: ['./activity-categorys.component.css']
})
export class ActivityCategorysComponent implements OnInit {

  randomQuote!: any;
  activityCategoryList!: ActivityCategory[];

  activityCategoryColumnHeaders: string[] = ['id', 'title', 'description', 'category','date_created', 'date_changed','owner'];
  sourceData = new MatTableDataSource<ActivityCategory>();
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(

    private dataSource: RestDataSource,
    private dialogue: MatDialog

  ) { }

  ngOnInit(): void {

    this.dataSource.fetchActivityCategory().subscribe(categorys => {
      this.sourceData.data = categorys;

    })

  }

   ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;

  }

   openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'

    const dialogRef = this.dialogue.open(EditCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(newActivity => {
    })
   }


  }


