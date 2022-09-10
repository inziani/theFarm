import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FinanceService } from '@app/core/services/finance.service';
import { CompanyMasterDataModel } from '../finance-models/fi-data-models/organization-data-models';
import { CompanyDialogComponent } from '../finance-dialogues/company-dialog/company-dialog.component';


@Component({
  selector: 'app-org-unit-details',
  templateUrl: './org-unit-details.component.html',
  styleUrls: ['./org-unit-details.component.css']
})
export class OrgUnitDetailsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public companyListing: CompanyMasterDataModel[] = [];
  public sourceData = new MatTableDataSource<CompanyMasterDataModel>();
  public companyColumnHeaders: string[] = ['id', 'company', 'companyName', 'country', 'language', 'currency', 'mobileNumber', 'email'];
  public resultsLength = 0;

  constructor(
    public financeService: FinanceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.financeService.fetchCompanyData().subscribe(response => {
      this.sourceData.data = response;
      console.log('source-', this.sourceData, 'response', response);
    })
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onDisplayCompany() {

  }
  public onCreateCompany() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.panelClass = 'companyClass';
    dialogConfig.hasBackdrop = true;
      const dialogRef = this.dialog.open(CompanyDialogComponent, dialogConfig);
       dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });

  }
  public onEditCompany() {

  }
  public onSave() {

  }
  public onDeleteCompany() {

  }

}
