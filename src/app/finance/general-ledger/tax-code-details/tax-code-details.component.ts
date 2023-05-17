import { Component, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { FinanceService } from '@app/core/services/finance.service';
import { TaxCode } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { TaxCodeDialogComponent } from '../gl-dialogues/tax-code-dialog/tax-code-dialog.component';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';

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
            this._matDialog.open(ErrorHandlingDialogComponent, { data: err }),
          complete: () => console.info('Complete'),
        });
      },
    });
  }
}
