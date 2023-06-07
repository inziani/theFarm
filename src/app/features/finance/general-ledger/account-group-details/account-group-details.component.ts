import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GLAccountGroup } from '@app/features/finance/finance-models/fi-data-models/organization-data-models';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountGroupDialogComponent } from '../gl-dialogues/account-group-dialog/account-group-dialog.component';
import { ErrorHandlingDialogComponent } from '@app/core/home-page/home-page-dialogues/error-handling-dialog/error-handling-dialog.component';
import { ChangesSavedDialogComponent } from '@app/core/home-page/home-page-dialogues/changes-saved-dialog/changes-saved-dialog.component';

@Component({
  selector: 'app-account-group-details',
  templateUrl: './account-group-details.component.html',
  styleUrls: ['./account-group-details.component.css'],
})
export class AccountGroupDetailsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public accountGroup!: GLAccountGroup;
  public accountGroupList!: GLAccountGroup[];
  public sourceData = new MatTableDataSource<GLAccountGroup>();
  public accountGroupColumnHeaders: string[] = [
    'id',
    'accountGroup',
    'description',
    'display',
    'edit',
    'delete',
  ];
  public resultsLength = 0;
  public errorMessage!: string;

  constructor(
    private _financeService: FinanceService,
    private readonly _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._financeService.fetchGLAccountGroupsData().subscribe({
      next: (accountGroupDataFetched) => {
        this.sourceData.data = accountGroupDataFetched;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onCreateAccountGroup(process: string) {
    const dialogConfig = new MatDialogConfig();
    this._financeService.sendData(process);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    const dialogRef = this._matDialog.open(
      AccountGroupDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe({
      next: (success) => console.info('Opened'),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }
  public maintainAccountGroup(process: string, id: number) {
    this._financeService.sendData(process);
    let dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    // fetch data from service

    this._financeService.fetchSingleGLAccountGroup(id).subscribe({
      next: (accountGroup) => {
        this.accountGroup = accountGroup;
        dialogConfig.data = this.accountGroup;
        let dialogRef = this._matDialog.open(
          AccountGroupDialogComponent,
          dialogConfig
        );

        dialogRef.afterClosed().subscribe({
          next: (result: string) => result,
          error: (err: string) =>
            this._matDialog.open(ErrorHandlingDialogComponent, { data: err }),
          complete: () => console.info('Complete'),
        });
      },
      error: (err) => this._matDialog.open(ChangesSavedDialogComponent),
      complete: () => console.info('Complete?'),
    });
  }
}
