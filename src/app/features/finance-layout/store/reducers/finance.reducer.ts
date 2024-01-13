import { ActionReducerMap } from '@ngrx/store';
import { FinanceModuleState } from '../state/finance-module.state';
import * as generalLedgerMasterDataReducer from './generel-ledger-master-data.reducer';

export const financeReducers: ActionReducerMap<FinanceModuleState> = {
  generalLedgerMasterData:
    generalLedgerMasterDataReducer.generalLedgerMasterDataReducer,
};
