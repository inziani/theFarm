import { GeneralLedgerMasterDataInterfaceState } from '../state/master-data/gl-master-data-interface-state';

import { generalLedgerMasterDataInterfaceAdapter } from '../adapters/general-ledger-master-data-interface-adapter';

import { createReducer, on } from '@ngrx/store';
import {
  GeneralLedgerMasterDataAPIActions,
  GeneralLedgerMasterDataPageActions,
} from '../actions/master-data/gl-master-data.actions';

export const initialState: GeneralLedgerMasterDataInterfaceState =
  generalLedgerMasterDataInterfaceAdapter.getInitialState({
    loading: false,
    errorMessage: '',
  });

export const generalLedgerMasterDataReducerInterface =
  createReducer<GeneralLedgerMasterDataInterfaceState>(
    initialState,
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]LoadGeneralLedgerAccountsMasterInterface'
      ],
      (state) =>
        generalLedgerMasterDataInterfaceAdapter.setAll([], {
          ...state,
          loading: true,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]LoadGeneralLedgerAccountsMasterInterfaceSuccess'
      ],
      (state, { GlAccountsMastersInterface }) =>
        generalLedgerMasterDataInterfaceAdapter.setAll(
          GlAccountsMastersInterface,
          {
            ...state,
            loading: false,
            errorMessage: '',
          }
        )
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]LoadGeneralLedgerAccountsMasterInterfaceFailure'
      ],
      (state, { errorMessage }) =>
        generalLedgerMasterDataInterfaceAdapter.setAll([], {
          ...state,
          loading: false,
          errorMessage: errorMessage,
        })
    )
  );
