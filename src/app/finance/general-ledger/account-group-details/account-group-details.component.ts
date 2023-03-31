import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GLAccountGroup } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@app/core/services/finance.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountGroupDialogComponent } from '../gl-dialogues/account-group-dialog/account-group-dialog.component';
import { CreateCompanyDialogComponent } from '@app/finance/finance-dialogues/create-company-dialog/create-company-dialog.component';

@Component({
  selector: 'app-account-group-details',
  templateUrl: './account-group-details.component.html',
  styleUrls: ['./account-group-details.component.css'],
})
export class AccountGroupDetailsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public accountGroupList!: GLAccountGroup[];
  public sourceData = new MatTableDataSource<GLAccountGroup>();
  public accountGroupColumnHeaders: string[] = [
    'id',
    'accountGroup',
    'accountGroupDescription',
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
    this._financeService.glAccountGroupsData.subscribe((response) => {
      this.sourceData.data = response;
    });


  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onCreateAccountGroup() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    // dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

     const dialogRef = this._matDialog.open(
       AccountGroupDialogComponent,
       dialogConfig
     );

    dialogRef.afterClosed().subscribe((success) => {
      return success;
    });
    dialogRef.afterClosed().subscribe({
      next: (success) => console.info('Dialogue Opened'),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  public onDisplayAccountGroup(id: number) {
    // Open Dialogue for Account group maintenance
  }

  public onEditAccountGroup(id: number) {
    // Open Dialogue for Account Group Maintenance
  }

  public onDeleteAccountGroup(id: number) {
    // Open Dialogue for Account Group Maintenance
  }
}
