import * as AppState from '@app/store/state/ui.state';
import * as GeneralLedgerMasterDataState from './master-data/gl-master-data.state';
import * as GeneralLedgerMasterDataInterfaceState from './master-data/gl-master-data-interface-state'

export interface State extends AppState.State {
  financeModuleState: FinanceModuleState;
}

export interface FinanceModuleState {
  generalLedgerMasterData: GeneralLedgerMasterDataState.GeneralLedgerMasterDataState;
  generalLedgerMasterDataInterface: GeneralLedgerMasterDataInterfaceState.GeneralLedgerMasterDataInterfaceState;
}
