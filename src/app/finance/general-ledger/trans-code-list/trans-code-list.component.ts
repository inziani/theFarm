import { Component } from '@angular/core';
import { FinanceService } from '@app/core/services/finance.service';

@Component({
  selector: 'app-trans-code-list',
  templateUrl: './trans-code-list.component.html',
  styleUrls: ['./trans-code-list.component.css'],
})
export class TransCodeListComponent {
  public accountGroup: string = 'accountGroup';
  public taxCode: string = 'taxCode';

  constructor(private _financeService: FinanceService) {}

  ngOnInit(): void {}

  public onSelectAccountGroup() {
    this._financeService.sendData(this.accountGroup);
  }

  public onSelectTaxCode() {
    this._financeService.sendData(this.taxCode);
  }

  // ngOnDestroy(): void {}
}
