import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@app/core/services/finance.service';
import { CompanyDialogComponent } from '../finance-dialogues/company-dialog/company-dialog.component';
import { CreateCompanyDialogComponent } from '../finance-dialogues/create-company-dialog/create-company-dialog.component';
import { DeleteCompanyDialogComponent } from '../finance-dialogues/delete-company-dialog/delete-company-dialog.component';
import { DisplayCompanyDialogComponent } from '../finance-dialogues/display-company-dialog/display-company-dialog.component';
import { CompanyMasterData } from '../finance-models/fi-data-models/organization-data-models';

@Component({
  selector: 'app-org-details-company',
  templateUrl: './org-details-company.component.html',
  styleUrls: ['./org-details-company.component.css']
})
export class OrgDetailsCompanyComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public companyListing: CompanyMasterData[] = [];
  public company!: CompanyMasterData;
  public sourceData = new MatTableDataSource<CompanyMasterData>();
  public companyColumnHeaders: string[] = [
    "id",
    "company",
    "companyName",
    "country",
    "language",
    "currency",
    "mobileNumber",
    "email",
    "display",
    "edit",
    "delete"
  ];
  public resultsLength = 0;


  constructor(

    private _financeService: FinanceService,
    private dialogue: MatDialog
  ) { }

  ngOnInit(): void {
    this._financeService.fetchCompanyData().subscribe((response) => {
      this.sourceData.data = response;
    });
  }
   ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
   }

  public onCreateCompany() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.panelClass = "companyClass";
    dialogConfig.hasBackdrop = true;

    const dialogRef = this.dialogue.open(CreateCompanyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((success) => {
      return success;
    });
  }

  public onDisplayCompany(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    // Fetch data from api

    this._financeService.fetchSingleCompany(id).subscribe((response) => {
      this.company = response;
      dialogConfig.data = this.company;

      // Open the dialogue config

      let dialogRef = this.dialogue.open(DisplayCompanyDialogComponent, dialogConfig);

      // ***Returned data from dialogue

      dialogRef.afterClosed().subscribe((result) => {
        if (result == undefined) {
          return;
        } else {
          console.log("Editable Data after else button", result);
        }
      });
    });
  }

  public onEditCompany(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    // Fetch data from api

    this._financeService.fetchSingleCompany(id).subscribe((response) => {
      this.company = response;
      dialogConfig.data = this.company;

      // Open the dialogue config

      let dialogRef = this.dialogue.open(CompanyDialogComponent, dialogConfig);

      // ***Returned data from dialogue

      dialogRef.afterClosed().subscribe((result) => {
        if (result == undefined) {
          return;
        } else {
          console.log("Editable Data after else button", result);
        }
      });
    });
  }

  public onDeleteCompany(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    // Fetch data from api

    this._financeService.fetchSingleCompany(id).subscribe((response) => {
      this.company = response;
      dialogConfig.data = this.company;

      // Open the dialogue config

      let dialogRef = this.dialogue.open(DeleteCompanyDialogComponent, dialogConfig);

      // ***Returned data from dialogue

      dialogRef.afterClosed().subscribe((result) => {
        if (result == undefined) {
          return;
        } else {
          console.log("Editable Data after else button", result);
        }
      });
    });
  }
}
