import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { BusinessAreaMasterDataModel } from '../finance-models/fi-data-models/organization-data-models';
import { BusinessAreaDialogComponent } from '../finance-dialogues/business-area-dialog/business-area-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FinanceService } from '@app/core/services/finance.service';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';

@Component({
  selector: 'app-org-details-businessarea',
  templateUrl: './org-details-businessarea.component.html',
  styleUrls: ['./org-details-businessarea.component.css']
})
export class OrgDetailsBusinessareaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public sourceData = new MatTableDataSource<BusinessAreaMasterDataModel>();
  public businessAreaColumnHeaders: string[] = [
    'id',
    'businessArea',
    'businessAreaName',
    'personResponsible',
    'companyCode',
    'display',
    'edit',
    'delete'
  ];
  public resultsLength = 0;
  public businessArea!: BusinessAreaMasterDataModel;


  constructor(

    private financeService: FinanceService,
    private dialogue: MatDialog
  ) { }

  ngOnInit(): void {

  }

  public onCreateBusinessArea(process: string) {

    let dialogConfig = new MatDialogConfig();
    this.financeService.sendData(process);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    let dialogRef = this.dialogue.open(BusinessAreaDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (result) => result,
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete')
    });

  }

  public onDisplayBusinessArea(process: string, id: number) {

  }

  public onEditBusinessArea(process: string, id: number) {

  }

  public onDeleteBusinessArea(process: string, id: number) {

  }

}
