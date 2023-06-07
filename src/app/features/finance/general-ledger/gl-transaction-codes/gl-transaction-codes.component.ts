import { Component } from '@angular/core';
import { FinanceService } from '@app/_helpers/services/finance.service';

@Component({
  selector: 'app-gl-transaction-codes',
  templateUrl: './gl-transaction-codes.component.html',
  styleUrls: ['./gl-transaction-codes.component.css'],
})
export class GlTransactionCodesComponent {
  public itemSelected!: string;
  public errorMessage!: string;

  constructor(private _financeService: FinanceService) {}

  ngOnInit(): void {
    this._financeService.data.subscribe({
      next: (data: string) => (this.itemSelected = data),
      error: (err: string) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }
}
