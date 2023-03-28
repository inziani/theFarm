import { Component } from '@angular/core';
import { FinanceService } from '@app/core/services/finance.service';

@Component({
  selector: 'app-trans-code-list',
  templateUrl: './trans-code-list.component.html',
  styleUrls: ['./trans-code-list.component.css'],
})
export class TransCodeListComponent {
  public accountGroup!: string;
  public taxCode!: string;

  constructor(private _financeService: FinanceService) {}

  ngOnInit(): void {}

  public onSelectAccountGroup() {
    this._financeService.itemSelected.emit(this.accountGroup);
  }

  public onSelectTaxCode() {
    this._financeService.itemSelected.emit(this.taxCode);
  }
}
