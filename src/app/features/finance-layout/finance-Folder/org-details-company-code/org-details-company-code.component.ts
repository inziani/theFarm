import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { DeleteCompanyCodeDialogComponent } from '@app/features/finance-layout/finance-Folder/finance-dialogues/delete-company-code-dialog/delete-company-code-dialog.component';
import { EditCompanyCodeDialogComponent } from '@app/features/finance-layout/finance-Folder/finance-dialogues/edit-company-code-dialog/edit-company-code-dialog.component';
import { CreateCompanyCodeDialogComponent } from '../finance-dialogues/create-company-code-dialog/create-company-code-dialog.component';
import { DisplayCompanyCodeDialogComponent } from '../finance-dialogues/display-company-code-dialog/display-company-code-dialog.component';
import { CompanyCodeMasterData } from '../finance-models/fi-data-models/organization-data-models';

@Component({
  selector: 'app-org-details-company-code',
  templateUrl: './org-details-company-code.component.html',
  styleUrls: ['./org-details-company-code.component.css'],
})
export class OrgDetailsCompanyCodeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public companyCodeColumnHeaders: string[] = [
    'id',
    'companyCode',
    'companyCodeName',
    'company',
    'display',
    'edit',
    'delete',
  ];
  public resultsLength = 0;
  public companyCode!: CompanyCodeMasterData;
  public sourceData = new MatTableDataSource<CompanyCodeMasterData>();

  constructor(
    private _dialogue: MatDialog,
    private _financeService: FinanceService
  ) {}

  ngOnInit(): void {
    this._financeService.fetchCompanyCodeData().subscribe((companyCode) => {
      this.sourceData.data = companyCode;
    });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onCreateCompanyCode() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    const dialogRef = this._dialogue.open(
      CreateCompanyCodeDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((success) => {
      return success;
    });
  }

  public onDisplayCompanyCode(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    // Fetch data from api

    this._financeService.fetchSingleCompanyCode(id).subscribe((companyCode) => {
      this.companyCode = companyCode;
      dialogConfig.data = this.companyCode;

      // Open the dialogue config

      let dialogRef = this._dialogue.open(
        DisplayCompanyCodeDialogComponent,
        dialogConfig
      );

      // ***Returned data from dialogue

      dialogRef.afterClosed().subscribe((result) => {
        if (result == undefined) {
          return;
        } else {
          // console.log("Editable Data after else button", result);
        }
      });
    });
  }

  public onEditCompanyCode(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    // Fetch data from api

    this._financeService.fetchSingleCompanyCode(id).subscribe((companyCode) => {
      this.companyCode = companyCode;
      dialogConfig.data = companyCode;

      // Open the dialogue config

      let dialogRef = this._dialogue.open(
        EditCompanyCodeDialogComponent,
        dialogConfig
      );

      // ***Returned data from dialogue

      dialogRef.afterClosed().subscribe((result) => {
        if (result == undefined) {
          return;
        } else {
          // console.log("Editable Data after else button", result);
        }
      });
    });
  }

  public onDeleteCompanyCode(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    // Fetch data from api

    this._financeService.fetchSingleCompanyCode(id).subscribe((companyCode) => {
      this.companyCode = companyCode;
      dialogConfig.data = this.companyCode;

      // Open the dialogue config

      let dialogRef = this._dialogue.open(
        DeleteCompanyCodeDialogComponent,
        dialogConfig
      );

      // ***Returned data from dialogue

      dialogRef.afterClosed().subscribe((result) => {
        if (result == undefined) {
          return;
        } else {
          // console.log("Editable Data after else button", result);
        }
      });
    });
  }
}
