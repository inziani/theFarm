import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, SortDirection } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { FinanceService } from "@app/core/services/finance.service";
import { CompanyMasterDataModel } from "../finance-models/fi-data-models/organization-data-models";
import { CompanyDialogComponent } from "../finance-dialogues/company-dialog/company-dialog.component";

@Component({
  selector: "app-org-unit-details",
  templateUrl: "./org-unit-details.component.html",
  styleUrls: ["./org-unit-details.component.css"],
})
export class OrgUnitDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public companyListing: CompanyMasterDataModel[] = [];
  public company!: CompanyMasterDataModel;
  public sourceData = new MatTableDataSource<CompanyMasterDataModel>();
  public companyColumnHeaders: string[] = [
    "select",
    "id",
    "company",
    "companyName",
    "country",
    "language",
    "currency",
    "mobileNumber",
    "email",
  ];
  public resultsLength = 0;
  public isSelected: boolean = true;

  constructor(
    public financeService: FinanceService,
    public dialogue: MatDialog
  ) {}

  ngOnInit(): void {
    this.financeService.fetchCompanyData().subscribe((response) => {
      this.sourceData.data = response;
    });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onSelectCompany(id: number) {
    this.isSelected = !this.isSelected;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    // Fetch data from api

    this.financeService.fetchSingleCompany(id).subscribe((response) => {
      this.company = response;
      dialogConfig.data = this.company;
      console.log("API sending component data-", this.company);
      console.log("dialogConfig.data-", dialogConfig.data);

      console.log("dialogConfig.data-", dialogConfig.data);

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

  public onDisplayCompany() {}

  public onCreateCompany() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.panelClass = "companyClass";
    dialogConfig.hasBackdrop = true;
    const dialogRef = this.dialogue.open(CompanyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }
  public onEditCompany() {}
  public onSave() {}
  public onDeleteCompany() {}
}
