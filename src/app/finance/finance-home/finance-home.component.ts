import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CompanyDialogComponent } from '../finance-dialogues/company-dialog/company-dialog.component';

@Component({
  selector: 'app-finance-home',
  templateUrl: './finance-home.component.html',
  styleUrls: ['./finance-home.component.css']
})
export class FinanceHomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSelectCompany() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.panelClass = 'companyClass';
      const dialogRef = this.dialog.open(CompanyDialogComponent, dialogConfig);
       dialogRef.afterClosed().subscribe(success => {
      console.log(success);
    });
    // alert('The Company link  works!')

  }

  onSelectCompanyCode() {

    alert('The Company code link works!')

  }

  onSelectChartOfAccounts() {

    alert('The Chart of Accounts link works!')

  }

  onSelectReportingArea() {

    alert('The Reporting Area link works!')

  }

  onSelectControllingArea() {

    alert('The Controlling Area link works!')

  }

  onSelectBusinessArea() {

    alert('The Business Area link works!')

  }

  onSelectSalesArea() {
    alert('The Sales Area link works')
  }

}
