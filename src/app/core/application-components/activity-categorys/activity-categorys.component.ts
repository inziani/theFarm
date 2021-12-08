import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { RestDataSource } from '@app/shared/data/rest.datasource';
import { ActivityCategoryInterface } from '@app/shared/interfaces/activity-category';
import { ActivityCategory } from '@app/shared/models/activity-category.models';

import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { DeleteDialogComponent } from '@app/core/dialogues/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-activity-categorys',
  templateUrl: './activity-categorys.component.html',
  styleUrls: ['./activity-categorys.component.css']
})
export class ActivityCategorysComponent implements OnInit {

  randomQuote: string = 'God always makes a way';

  activityCategoryList!: ActivityCategory[];
  activityCategoryColumnHeaders: string[] = ['id', 'title', 'description', 'category', 'date_created', 'date_changed', 'maintenance', 'owner'];
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

  openCreateCategoryDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    // dialogConfig.direction = 'rtl'

    const dialogRef = this.dialogue.open(CreateCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(newActivity => {
      // this.refreshTable.renderRows();
    });
  }

  openEditCategoryDialog(id: number) {
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

  openDeleteCategoryDialogue(id: number) {
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
      dialogConfig.data = category;

      // ***Open Dialog
      const dialogRef = this.dialogue.open(DeleteDialogComponent, dialogConfig);

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

  }

