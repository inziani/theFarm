import { Component, OnInit } from '@angular/core';
import { GeneralLedgerMasterDataState } from '@app/features/finance-layout/store/state/master-data/gl-master-data.state';
import { Store } from '@ngrx/store';
import {
  selectAllGeneralLedgerMasterData,
  selectGeneralLedgerMasterDataEntities,
  selectGeneralLedgerMasterDateHeaders,
} from '@app/features/finance-layout/store/selectors/general-ledger.selectors';
import { GeneralLedgerMasterData } from '../../../finance-models/fi-data-models/gl-account-master-model';


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

  ngOnInit(): void {
    this._store.select(selectGeneralLedgerMasterDateHeaders).subscribe({
      next:(value)=> this.GeneralLedgerMasterDataHeaders = value

    })
    console.log('Headers - ', this.GeneralLedgerMasterDataHeaders)
  }

  constructor(private _store: Store<GeneralLedgerMasterDataState>) {}
}
