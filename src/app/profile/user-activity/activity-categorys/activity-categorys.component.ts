import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
// import { ActivityCategoryInterface } from '@app/shared/interfaces/activity-interface';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';

// import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';
// import { DeleteCategoryDialogComponent } from '@app/shared/user-feedback-dialogues/delete-category-dialog/delete-category-dialog.component';
import { Store } from '@ngrx/store';
import { ActivityCategoryState } from '@app/profile/store/state/activity-category.state';
import { selectActivityCategoryEntities, selectAllActivityCategories } from '@app/profile/store/selectors/activity-category.selectors';
// import { ActivityCategoryPageActions } from '@app/profile/store/actions/activity-category.actions';
// import { selectActivityCategories } from '@app/profile/store/reducers/activity-category.reducer';

@Component({
  selector: 'app-activity-categorys',
  templateUrl: './activity-categorys.component.html',
  styleUrls: ['./activity-categorys.component.css'],
})
export class ActivityCategorysComponent implements OnInit {
  public activityCategoryList!: ActivityCategory[];
  public activityCategoryColumnHeaders: string[] = [
    'id',
    'title',
    'description',
    'category',
    'date_created',
    'date_changed',
    'edit',
    'delete',
    'owner',
  ];
  public sourceData = new MatTableDataSource<ActivityCategory>();
  public resultsLength = 0;
  public errorMessage!: string;
  public activityCategories$ = this._store.select(selectAllActivityCategories);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) refreshTable!: MatTable<any>;

  ngOnInit(): void {
    console.log('are they already loaded? -', this.activityCategories$);
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

    const dialogRef = this._dialog.open(CreateCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((newActivity) => {
      console.log(newActivity);
    });
  }

  openEditCategoryDialog(id: number) {
    console.log(id);
  }

  // openEditCategoryDialog(id: number) {
  //   // ***create dialog object
  //   const dialogConfig = new MatDialogConfig();
  //   // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '400px';
  //   // dialogConfig.direction = 'rtl'

  //   // ****fetch data from the API
  //   this.dataSource.fetchSingleActivityCategory(id).subscribe((response) => {
  //     let category = response;
  //     dialogConfig.data = category;

  //     // ***Open Dialog
  //     const dialogRef = this._dialog.open(EditCategoryComponent, dialogConfig);

  //     // ***Returned data from dialogue
  //     dialogRef.afterClosed().subscribe((result) => {
  //       if (result == undefined) {
  //         return;
  //       } else {
  //         console.log('Editable Data after else button', result);
  //       }
  //     });
  //   });
  // }

  openDeleteCategoryDialog(id: number) {
    console.log(id);
  }

  // openDeleteCategoryDialog(id: number) {
  //   // ***create dialog object
  //   const dialogConfig = new MatDialogConfig();
  //   // ***stop user from closing dialog by clicking elsewhere and other dialog configuration
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '400px';
  //   // dialogConfig.direction = 'rtl'

  //   // ****fetch data from the API
  //   this.dataSource.fetchSingleActivityCategory(id).subscribe((response) => {
  //     let category = response;
  //     dialogConfig.data = category;

  //     // ***Open Dialog
  //     const dialogRef = this._dialog.open(
  //       DeleteCategoryDialogComponent,
  //       dialogConfig
  //     );

  //     // ***Returned data from dialogue
  //     dialogRef.afterClosed().subscribe((result) => {
  //       if (result == undefined) {
  //         return;
  //       } else {
  //         console.log('Editable Data after else button', result);
  //       }
  //     });
  //   });
  // }

  constructor(
    private _store: Store<ActivityCategoryState>,
    public _dialog: MatDialog
  ) {}
}
