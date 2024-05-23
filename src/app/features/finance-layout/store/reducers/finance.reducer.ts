import { ActionReducerMap } from '@ngrx/store';
import { FinanceModuleState } from '../state/finance-module.state';
import * as generalLedgerMasterData from './generel-ledger-master-data.reducer';
import * as generalLedgerMasterDataInterface from './general-ledger-interface-reducer';

export const financeReducers: ActionReducerMap<FinanceModuleState> = {
  generalLedgerMasterData:
    generalLedgerMasterData.generalLedgerMasterDataReducer,
  generalLedgerMasterDataInterface:
    generalLedgerMasterDataInterface.generalLedgerMasterDataReducerInterface
};
