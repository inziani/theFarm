import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CompanyCodeMasterDataModel, ControllingAreaMasterDataModel } from '../finance-models/fi-data-models/organization-data-models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FinanceService } from '@app/core/services/finance.service';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { ControllingAreaDialogComponent } from '../finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';

@Component({
  selector: 'app-org-details-controllingarea',
  templateUrl: './org-details-controllingarea.component.html',
  styleUrls: ['./org-details-controllingarea.component.css']
})
export class OrgDetailsControllingareaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public sourceData = new MatTableDataSource<ControllingAreaMasterDataModel>();
  public controllingAreaColumnHeaders: string[] = [
    'id',
    'controllingArea',
    'controllingAreaName',
    'personResponsible',
    'companyCode',
    'display',
    'edit',
    'delete'
  ];

  public resultsLength = 0;


  constructor(
    private dialogue: MatDialog,
    private financeService: FinanceService

  ) { }

  ngOnInit(): void {

    this.financeService.fetchControllingAreaData().subscribe({
      next: (controllingAreaDataFetched) => this.sourceData.data = controllingAreaDataFetched,
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete')
    });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;

  }

  public onDisplayControllingArea(process: string, id: number) {

  }

  public onCreateControllingArea(process: string) {

    let dialogConfig = new MatDialogConfig();
    this.financeService.sendData(process);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    let dialogRef = this.dialogue.open(ControllingAreaDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (result) => result,
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete')
    })
  }

  public onEditControllingArea(process: string, id: number) {

  }
  public onDeleteCompanyCode(process: string, id: number) {

 }

}
