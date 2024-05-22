import { ActionReducerMap } from '@ngrx/store';
import { FinanceModuleState } from '../state/finance-module.state';
import * as generalLedgerMasterDataReducer from './generel-ledger-master-data.reducer';
import * as generalLedgerMasterDataReducerInterface from './general-ledger-interface-reducer';

export const financeReducers: ActionReducerMap<FinanceModuleState> = {
  generalLedgerMasterData:
    generalLedgerMasterDataReducer.generalLedgerMasterDataReducer,
  generalLedgerMasterDataInterface:
    generalLedgerMasterDataReducerInterface.generalLedgerMasterDataReducerInterface
};
