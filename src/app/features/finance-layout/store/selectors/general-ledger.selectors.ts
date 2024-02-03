import { createFeatureSelector, createSelector } from '@ngrx/store';
import { generalLedgerMasterDataAdapter } from '../adapters/general-ledger-master-data.adapter';
import { FinanceModuleState } from '../state/finance-module.state';

export const getFinanceModuleStore =
  createFeatureSelector<FinanceModuleState>('financeModule');

export const selectGeneralLedgerState = createSelector(
  getFinanceModuleStore,
  (FinanceModuleState) => FinanceModuleState.generalLedgerMasterData
);

const {
  selectIds: selectIds,
  selectAll: selectAll,
  selectEntities: selectEntities,
  selectTotal: selectTotal,
} = generalLedgerMasterDataAdapter.getSelectors();

export const selectAllGeneralLedgerMasterData = createSelector(
  selectGeneralLedgerState,
  selectAll
);

export const selectGeneralLedgerMasterDataEntities = createSelector(
  selectGeneralLedgerState,
  selectEntities
);
export const selectGeneralLedgerMasterDataIds = createSelector(
  selectGeneralLedgerState,
  selectIds
);
export const selectGeneralLedgerMasterDataCount = createSelector(
  selectGeneralLedgerState,
  selectTotal
);

export const selectLoading = createSelector(
  selectGeneralLedgerState,
  (GeneralLedgerState) => GeneralLedgerState.loading
);

export const selectGeneralLedgerMasterDataErrorMessage = createSelector(
  selectGeneralLedgerState,
  (generalLedgerMasterData) => generalLedgerMasterData.errorMessage
);

export const selectGeneralLedgerMasterDateHeaders = createSelector(
  selectGeneralLedgerState,
  (generalLedgerMasterData) =>
    generalLedgerMasterData.GeneralLedgerMasterDataFieldNames
);

export const selectGeneralLedgerMasterDataById = (id: number) =>
  createSelector(
    selectGeneralLedgerMasterDataEntities,
    (generalLedgerMasterDataStateEntities) =>
      generalLedgerMasterDataStateEntities[id]
  );
