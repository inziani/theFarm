import * as AppState from '@app/store/state/ui.state';
import * as GeneralLedgerMasterDataState from './master-data/gl-master-data.state';


export interface State extends AppState.State {
  financeModuleState: FinanceModuleState;
}

export interface FinanceModuleState {
  generalLedgerMasterData: GeneralLedgerMasterDataState.GeneralLedgerMasterDataState,
  generalLedgerMasterDataInterface: GeneralLedgerMasterDataState.GeneralLedgerMasterDataInterfaceState
}
