import {
  Component,
  Inject,
  OnInit,
  Signal,
  ViewChild,
  signal,
} from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';

import { CreateCategoryComponent } from '../create-category/create-category.component';
import { Store } from '@ngrx/store';
import { ActivityCategoryState } from '@app/profile/store/state/activity-category.state';
import { ActivityCategoryPageActions } from '@app/profile/store/actions/activity-category.actions';
import * as ActivityCategorySelectors from '@app/profile/store/selectors/activity-category.selectors';
// import { selectAllActivityCategories } from '@app/profile/store/selectors/activity-category.selectors';

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

  // public activityCategories!: Signal<ActivityCategory[]>;
  // public activityCategories = this._store.selectSignal(
  //   selectAllActivityCategories
  // );
  public activityCategories$ = this._store.select(
    ActivityCategorySelectors.selectAllActivityCategories
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) refreshTable!: MatTable<any>;

  ngOnInit(): void {
    this.activityCategories$.subscribe({
      next: (activityCategory) => {
        this.sourceData.data = activityCategory;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
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
