import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';

import { BusinessAreaMasterData } from '../finance-models/fi-data-models/organization-data-models';
import { BusinessAreaDialogComponent } from '../finance-dialogues/business-area-dialog/business-area-dialog.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { FinanceService } from '@app/core/services/finance.service';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { ControllingAreaDialogComponent } from '../finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';

@Component({
  selector: 'app-org-details-businessarea',
  templateUrl: './org-details-businessarea.component.html',
  styleUrls: ['./org-details-businessarea.component.css']
})
export class OrgDetailsBusinessareaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public sourceData = new MatTableDataSource<BusinessAreaMasterData>();
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
  public businessArea!: BusinessAreaMasterData;
  public errorMessage!: string;


  constructor(

    private financeService: FinanceService,
    private dialogue: MatDialog
  ) { }

  ngOnInit(): void {
    this.financeService.fetchBusinessAreaData().subscribe({
      next: (businessAreaDataFetched) => this.sourceData.data = businessAreaDataFetched,
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err}),
      complete: () => console.info('complete')
    });

  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
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
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err}),
      complete: () => console.info('complete')
    });

  }

  public onDisplayBusinessArea(process: string, id: number) {

    this.financeService.sendData(process);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'custom-modal';

    // Fetch Data from api

    this.financeService.fetchSingleBusinessArea(id).subscribe({
      next: (businessArea) =>
      {
        this.businessArea = businessArea;
        dialogConfig.data = this.businessArea;
        let dialogRef = this.dialogue.open(BusinessAreaDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe({
          next: (result) => result,
          error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err}),
          complete: () => console.info('Complete')

    });
      },
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, {data: this.errorMessage = err}),
      complete: () => console.info('Complete?')
    });

  }

  public onEditBusinessArea(process: string, id: number) {

    this.financeService.sendData(process);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    // Fetch Data from api

    this.financeService.fetchSingleBusinessArea(id).subscribe({
      next: (businessArea) =>
      {
        this.businessArea = businessArea;
        dialogConfig.data = this.businessArea;
        let dialogRef = this.dialogue.open(BusinessAreaDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe({
          next: (result) => result,
          error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err}),
          complete: () => console.info('Complete')

    });
      },
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err}),
      complete: () => console.info('Complete?')
    });


  }

  public onDeleteBusinessArea(process: string, id: number) {

    this.financeService.sendData(process);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.hasBackdrop = true;

    this.financeService.fetchSingleBusinessArea(id).subscribe({
      next: (businessArea) =>
      {
        this.businessArea = businessArea;
        dialogConfig.data = this.businessArea;
        let dialogRef = this.dialogue.open(BusinessAreaDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe({
          next: (result) => result,
          error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err}),
          complete: () => console.info('Complete')

    });
      },
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent, { data: this.errorMessage = err}),
      complete: () => console.info('Complete?')
    });
  }
}
