import { createFeatureSelector, createSelector } from '@ngrx/store';
import { generalLedgerMasterDataInterfaceAdapter } from '../adapters/general-ledger-master-data-interface-adapter';
import { FinanceModuleState } from '../state/finance-module.state';

export const getFinanceModuleInterfaceStore =
  createFeatureSelector<FinanceModuleState>('financeModule');

export const selectGeneralLedgerStateInterface = createSelector(
  getFinanceModuleInterfaceStore,
  (FinanceModuleState) => FinanceModuleState.generalLedgerMasterDataInterface
);

const {
  selectIds: selectIds,
  selectAll: selectAll,
  selectEntities: selectEntities,
  selectTotal: selectTotal,
} = generalLedgerMasterDataInterfaceAdapter.getSelectors();

export const selectAllGeneralLedgerMasterDataInterface = createSelector(
  selectGeneralLedgerStateInterface,
  selectAll
);

export const selectGeneralLedgerMasterDataInterfaceEntities = createSelector(
  selectGeneralLedgerStateInterface,
  selectEntities
);
export const selectGeneralLedgerMasterDataInterfaceIds = createSelector(
  selectGeneralLedgerStateInterface,
  selectIds
);
export const selectGeneralLedgerMasterDataInterfaceCount = createSelector(
  selectGeneralLedgerStateInterface,
  selectTotal
);

export const selectLoading = createSelector(
  selectGeneralLedgerStateInterface,
  (GeneralLedgerInterfaceState) => GeneralLedgerInterfaceState.loading
);

export const selectGeneralLedgerMasterDataInterfaceErrorMessage =
  createSelector(
    selectGeneralLedgerStateInterface,
    (generalLedgerMasterDataInterface) =>
      generalLedgerMasterDataInterface.errorMessage
  );

export const selectGeneralLedgerMasterDataInterfaceById = (id: number) =>
  createSelector(
    selectGeneralLedgerMasterDataInterfaceEntities,
    (generalLedgerMasterDataStateInterfaceEntities) =>
      generalLedgerMasterDataStateInterfaceEntities[id]
  );
