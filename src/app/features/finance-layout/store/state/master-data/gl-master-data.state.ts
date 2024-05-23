import { EntityState } from '@ngrx/entity';
import { GeneralLedgerMasterData, GeneralLedgerMasterDataInterface } from '@app/features/finance-layout/finance-Folder/finance-models/fi-data-models/gl-account-master-model';
import * as AppState from '@app/store/state/ui.state';

export interface State extends AppState.State {
  generalLedgerMasterData: GeneralLedgerMasterDataState;
}

export interface GeneralLedgerMasterDataState
  extends EntityState<GeneralLedgerMasterData> {
  loading: boolean;
  errorMessage: string;
  GeneralLedgerMasterDataFieldNames: GeneralLedgerMasterData;
  
}
