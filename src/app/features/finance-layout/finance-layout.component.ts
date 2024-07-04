import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceService } from '@app/_helpers/services/finance.service';

@Component({
  selector: 'app-finance-layout',
  templateUrl: './finance-layout.component.html',
  styleUrls: ['./finance-layout.component.css'],
})
export class FinanceLayoutComponent implements OnInit {
  public itemSelected!: string;
  public generalLedger: string = 'generalLedger';
  public accountsPayable: string = 'accountsPayable';
  public accountsReceivables: string = 'accountsReceivables';
  public fixedAssets: string = 'fixedAssets';
  public multiCurrency: string = 'multiCurrency';
  public taxManagement: string = 'taxManagement';
  public treasuryBanking: string = 'treasuryBanking';

  constructor(
    private _financeService: FinanceService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  public OnSelectGeneralLedger() {
    // this._financeService.itemSelected.emit(this.generalLedger);
    this._route.navigate(['/glHome']);
  }
}
