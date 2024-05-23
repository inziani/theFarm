
import { EntityState } from '@ngrx/entity';
import {
  GeneralLedgerMasterDataInterface,
} from '@app/features/finance-layout/finance-Folder/finance-models/fi-data-models/gl-account-master-model';
import * as AppState from '@app/store/state/ui.state';

export interface State extends AppState.State {
  generalLedgerMasterDataInterface: GeneralLedgerMasterDataInterfaceState;
}

export interface GeneralLedgerMasterDataInterfaceState
  extends EntityState<GeneralLedgerMasterDataInterface> {
  loading: boolean;
  errorMessage: string;
  
}
