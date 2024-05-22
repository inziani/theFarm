import { Component, OnInit } from '@angular/core';
import { GeneralLedgerMasterDataState } from '@app/features/finance-layout/store/state/master-data/gl-master-data.state';
import { Store } from '@ngrx/store';
import {
  selectAllGeneralLedgerMasterData,
  selectGeneralLedgerMasterDataEntities,
  selectGeneralLedgerMasterDateHeaders,
} from '@app/features/finance-layout/store/selectors/general-ledger.selectors';
import {
  GeneralLedgerMasterData,
  GeneralLedgerMasterDataInterface,
} from '../../../finance-models/fi-data-models/gl-account-master-model';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { selectAllGeneralLedgerMasterDataInterface } from '@app/features/finance-layout/store/selectors/general-ledger-md-interface-selectors';
import { GeneralLedgerMasterDataPageActions } from '@app/features/finance-layout/store/actions/master-data/gl-master-data.actions';

@Component({
  selector: 'app-master-data-report',
  templateUrl: './master-data-report.component.html',
  styleUrls: ['./master-data-report.component.css'],
})
export class MasterDataReportComponent implements OnInit {
  public GeneralLedgerMasterDataHeaders!: GeneralLedgerMasterData;
  public GeneralLedgerMasterDataList$ = this._store.select(
    selectAllGeneralLedgerMasterData
  );
  public GeneralLedgerMasterDataListInterface$ = this._store.select(
    selectAllGeneralLedgerMasterDataInterface
  );
  public GeneralLedgerMasterDataList!: GeneralLedgerMasterDataInterface[];
  public errowMessage!: string;

  ngOnInit(): void {
    this._store.select(selectGeneralLedgerMasterDateHeaders).subscribe({
      next: (value) => (this.GeneralLedgerMasterDataHeaders = value),
    });
    this._store.dispatch(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]LoadGeneralLedgerAccountsMasterInterface'
      ]()
    );

    console.log(
      'GL Master Data Interface - ',
      this.GeneralLedgerMasterDataListInterface$
    );
    console.log('GL Master Data List - ', this.GeneralLedgerMasterDataList$);
  }

  constructor(
    private _store: Store<GeneralLedgerMasterDataState>,
    private _financeService: FinanceService
  ) {}
}
