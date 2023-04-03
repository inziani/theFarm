import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ControllingAreaMasterData } from '../finance-models/fi-data-models/organization-data-models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FinanceService } from '@app/core/services/finance.service';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { ControllingAreaDialogComponent } from '../finance-dialogues/controlling-area-dialog/controlling-area-dialog.component';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';

@Component({
  selector: 'app-org-details-controllingarea',
  templateUrl: './org-details-controllingarea.component.html',
  styleUrls: ['./org-details-controllingarea.component.css'],
})
export class OrgDetailsControllingareaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public sourceData = new MatTableDataSource<ControllingAreaMasterData>();
  public controllingAreaColumnHeaders: string[] = [
    'id',
    'controllingArea',
    'controllingAreaName',
    'personResponsible',
    'companyCode',
    'display',
    'edit',
    'delete',
  ];

  public resultsLength = 0;
  public controllingArea!: ControllingAreaMasterData;

  constructor(
    private dialogue: MatDialog,
    private financeService: FinanceService
  ) {}

  ngOnInit(): void {
    this.financeService.fetchControllingAreaData().subscribe({
      next: (controllingAreaDataFetched) =>
        (this.sourceData.data = controllingAreaDataFetched),
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete'),
    });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onDisplayControllingArea(process: string, id: number) {
    this.financeService.sendData(process);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    // Fetch Data from api

    this.financeService.fetchSingleControllingArea(id).subscribe({
      next: (controllingArea) => {
        this.controllingArea = controllingArea;
        dialogConfig.data = this.controllingArea;
        let dialogRef = this.dialogue.open(
          ControllingAreaDialogComponent,
          dialogConfig
        );

        dialogRef.afterClosed().subscribe({
          next: (result) => result,
          error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
          complete: () => console.info('Complete'),
        });
      },
      error: (err) => this.dialogue.open(ChangesSavedDialogComponent),
      complete: () => console.info('Complete?'),
    });
  }

  public onCreateControllingArea(process: string) {
    let dialogConfig = new MatDialogConfig();
    this.financeService.sendData(process);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    let dialogRef = this.dialogue.open(
      ControllingAreaDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe({
      next: (result) => result,
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete'),
    });
  }

  public onEditControllingArea(process: string, id: number) {
    this.financeService.sendData(process);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    // Fetch Data from api

    this.financeService.fetchSingleControllingArea(id).subscribe({
      next: (controllingArea) => {
        this.controllingArea = controllingArea;
        dialogConfig.data = this.controllingArea;
        let dialogRef = this.dialogue.open(
          ControllingAreaDialogComponent,
          dialogConfig
        );

        dialogRef.afterClosed().subscribe({
          next: (result) => result,
          error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
          complete: () => console.info('Complete'),
        });
      },
      error: (err) => this.dialogue.open(ChangesSavedDialogComponent),
      complete: () => console.info('Complete?'),
    });
  }
  public onDeleteCompanyCode(process: string, id: number) {
    this.financeService.sendData(process);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    this.financeService.fetchSingleControllingArea(id).subscribe({
      next: (controllingArea) => {
        this.controllingArea = controllingArea;
        dialogConfig.data = this.controllingArea;
        let dialogRef = this.dialogue.open(
          ControllingAreaDialogComponent,
          dialogConfig
        );

        dialogRef.afterClosed().subscribe({
          next: (result) => result,
          error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
          complete: () => console.info('Complete'),
        });
      },
      error: (err) => this.dialogue.open(ChangesSavedDialogComponent),
      complete: () => console.info('Complete?'),
    });
  }
}
