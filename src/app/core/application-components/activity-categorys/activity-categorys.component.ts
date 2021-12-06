import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RestDataSource } from '@app/shared/data/rest.datasource';
import { ActivityCategoryInterface } from '@app/shared/interfaces/activity-category';
import { ActivityCategory } from '@app/shared/models/activity-category.models';
import { map } from 'rxjs/operators';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-activity-categorys',
  templateUrl: './activity-categorys.component.html',
  styleUrls: ['./activity-categorys.component.css']
})
export class ActivityCategorysComponent implements OnInit {

  randomQuote: string = 'God always makes a way';
  receivedId!: number;
  receivedData: any;
  activityCategoryList!: ActivityCategory[];
  activityCategoryColumnHeaders: string[] = ['id', 'title', 'description', 'category','date_created', 'date_changed','maintenance','owner'];
  sourceData = new MatTableDataSource<ActivityCategoryInterface>();
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) refreshTable!: MatTable<any>;

  constructor(
    private dataSource: RestDataSource,
    public dialogue: MatDialog,
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
       // this.refreshTable.renderRows();
     });
   }

  openDialogueData() {

    // Create dialog config object
    const dialogConfig = new MatDialogConfig();

    // Configure the dialog object
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'
    dialogConfig.data = this.randomQuote;

    const dialogRef = this.dialogue.open(EditCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }
    });

  }

  editCategoryDialog(id: number) {
    // ***create dialog object
    const dialogConfig = new MatDialogConfig();
    // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'

    // ****fetch data from the API
    this.dataSource.fetchSingleActivityCategory(id).subscribe((response) => {
      let category = response;
      // this.receivedData = response;
      // dialogConfig.data = this.receivedData;
      dialogConfig.data = category;

      // ***Open Dialog
      const dialogRef = this.dialogue.open(EditCategoryComponent, dialogConfig);

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

  }


