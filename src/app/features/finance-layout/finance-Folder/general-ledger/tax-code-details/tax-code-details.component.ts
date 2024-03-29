import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { TaxCode } from '@app/features/finance-layout/finance-Folder/finance-models/fi-data-models/organization-data-models';
import { TaxCodeDialogComponent } from '../gl-dialogues/tax-code-dialog/tax-code-dialog.component';
import { ErrorsComponent } from '@app/errors/errors.component';

@Component({
  selector: 'app-tax-code-details',
  templateUrl: './tax-code-details.component.html',
  styleUrls: ['./tax-code-details.component.css'],
})
export class TaxCodeDetailsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public sourceData = new MatTableDataSource<TaxCode>();
  public errorMessage!: string;
  public taxCodeColumnHeaders: string[] = [
    'id',
    'taxCode',
    'taxCodeDescription',
    'taxCodePercentage',
    'display',
    'edit',
    'delete',
  ];
  public resultsLength = 0;
  public taxCode!: TaxCode;

  constructor(
    private _financeService: FinanceService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._financeService.fetchTaxCodeData().subscribe({
      next: (taxCodesList) => (this.sourceData.data = taxCodesList),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Tax Code List Sourced'),
    });
  }

  ngAfterViewInit() {
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  public onCreateTaxCode(process: string) {
    this._financeService.sendData(process);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    const dialogRef = this._matDialog.open(
      TaxCodeDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe({
      next: (success) => console.info('Tac'),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  public maintainTaxCode(process: string, id: number) {
    this._financeService.sendData(process);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.hasBackdrop = true;

    this._financeService.fetchSingleTaxCode(id).subscribe({
      next: (taxCode) => {
        this.taxCode = taxCode;
        dialogConfig.data = this.taxCode;
        const dialogRef = this._matDialog.open(
          TaxCodeDialogComponent,
          dialogConfig
        );
        dialogRef.afterClosed().subscribe({
          next: (result: string) => result,
          error: (err: string) =>
            this._matDialog.open(ErrorsComponent, { data: err }),
          complete: () => console.info('Complete'),
        });
      },
    });
  }
}
