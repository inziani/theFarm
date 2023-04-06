import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@app/core/services/finance.service';
import { TaxCode } from '@app/finance/finance-models/fi-data-models/organization-data-models';

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

  constructor(private _financeService: FinanceService) {}

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
    // Open Dialogue Box
  }

  public maintainTaxCode(process: string, id: number) {
    // Open Dialogue
  }
}
