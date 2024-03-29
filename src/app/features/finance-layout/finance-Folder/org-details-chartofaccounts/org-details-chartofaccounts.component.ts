import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ChartOfAccountsMasterData } from '../finance-models/fi-data-models/organization-data-models';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartOfAccountsDialogComponent } from '../finance-dialogues/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
import { ChartOfAccountsMasterDataFormGroup } from '../finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-org-details-chartofaccounts',
  templateUrl: './org-details-chartofaccounts.component.html',
  styleUrls: ['./org-details-chartofaccounts.component.css'],
})
export class OrgDetailsChartofaccountsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public coaCodeListing!: ChartOfAccountsMasterData;
  public sourceData = new MatTableDataSource<ChartOfAccountsMasterData>();
  public chartOfAccountsColumnHeaders: string[] = [
    'id',
    'coaCode',
    'companyCode',
    'chartOfAccountsName',
    'language',
    'lengthAccNumber',
    'blockedForPosting',
    'display',
    'edit',
    'delete',
  ];
  public resultsLength = 0;
  public display!: string;
  public create!: string;
  public edit!: string;
  public delete!: string;
  public chartOfAccounts!: ChartOfAccountsMasterData;
  public formGroup!: ChartOfAccountsMasterDataFormGroup;

  constructor(
    private _financeService: FinanceService,
    public _dialogue: MatDialog
  ) {}

  ngOnInit(): void {
    this._financeService
      .fetchChartOfAccountsData()
      .subscribe((chartOfAccountsData) => {
        this.sourceData.data = chartOfAccountsData;
      });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onCreateChartOfAccounts(process: string) {
    this._financeService.sendData(process);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // Open Dialog Creation

    let dialogueRef = this._dialogue.open(
      ChartOfAccountsDialogComponent,
      dialogConfig
    );
    dialogueRef.afterClosed().subscribe((result) => {
      return result;
    });
  }

  public onDisplayChartOfAccounts(process: string, id: number) {
    this._financeService.sendData(process);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // Fetch API Data

    this._financeService
      .fetchSingleChartOfAccounts(id)
      .subscribe((chartOfAccountsData) => {
        this.chartOfAccounts = chartOfAccountsData;
        dialogConfig.data = this.chartOfAccounts;

        // Open the DialogeComponent
        let dialogRef = this._dialogue.open(
          ChartOfAccountsDialogComponent,
          dialogConfig
        );

        // Return Data from Dialogue
        dialogRef.afterClosed().subscribe((result) => {
          if (result === undefined) {
            return;
          } else {
          }
        });
      });
  }

  public onEditChartOfAccounts(process: string, id: number) {
    this._financeService.sendData(process);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // Fetch API Data

    this._financeService
      .fetchSingleChartOfAccounts(id)
      .subscribe((chartOfAccountsData) => {
        this.chartOfAccounts = chartOfAccountsData;
        dialogConfig.data = this.chartOfAccounts;

        // Open the DialogeComponent
        let dialogRef = this._dialogue.open(
          ChartOfAccountsDialogComponent,
          dialogConfig
        );

        // Return Data from Dialogue
        dialogRef.afterClosed().subscribe((result) => {
          if (result === undefined) {
            return;
          } else {
          }
        });
      });
  }

  public onDeleteChartOfAccounts(process: string, id: number) {
    this._financeService.sendData(process);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;

    // Fetch API Data

    this._financeService
      .fetchSingleChartOfAccounts(id)
      .subscribe((chartOfAccountsData) => {
        this.chartOfAccounts = chartOfAccountsData;
        dialogConfig.data = this.chartOfAccounts;

        // Open the DialogeComponent
        let dialogRef = this._dialogue.open(
          ChartOfAccountsDialogComponent,
          dialogConfig
        );

        // Return Data from Dialogue
        dialogRef.afterClosed().subscribe((result) => {
          if (result === undefined) {
            return;
          } else {
          }
        });
      });
  }
}
