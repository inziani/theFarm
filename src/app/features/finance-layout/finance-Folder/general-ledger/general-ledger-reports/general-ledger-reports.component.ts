import { Component } from '@angular/core';
import { GeneralLedgerMasterDataPageActions } from '@app/features/finance-layout/store/actions/master-data/gl-master-data.actions';
import { GeneralLedgerMasterDataState } from '@app/features/finance-layout/store/state/master-data/gl-master-data.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-general-ledger-reports',
  templateUrl: './general-ledger-reports.component.html',
  styleUrls: ['./general-ledger-reports.component.css'],
})
export class GeneralLedgerReportsComponent {
  public ReportSelected!: string;

  public OnSelectChartOfAccounts() {
    this.ReportSelected = 'masterData';
    this._store.dispatch(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]LoadGeneralLedgerAccountsMaster'
      ]()
    );
  }

  public OnSelectAccountLineItems() {
    this.ReportSelected = 'accountLineItems';
  }

  public OnSelectTrialBalance() {
    this.ReportSelected = 'trialBalance';
  }

  public OnSelectToBeDetermined() {
    this.ReportSelected = 'tba';
  }
  constructor(private _store: Store<GeneralLedgerMasterDataState>) {}
}
