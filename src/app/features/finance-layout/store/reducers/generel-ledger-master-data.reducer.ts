import { createReducer, on } from '@ngrx/store';
import { GeneralLedgerMasterDataState } from '../state/master-data/gl-master-data.state';
import {
  GeneralLedgerMasterDataPageActions,
  GeneralLedgerMasterDataAPI,
} from '../actions/master-data/gl-master-data.actions';
import { generalLedgerMasterDataAdapter } from '../adapters/general-ledger-master-data.adapter';

export const initialState: GeneralLedgerMasterDataState =
  generalLedgerMasterDataAdapter.getInitialState({
    loading: false,
    errorMessage: '',
  });

export const generalLedgerMasterDataReducer =
  createReducer<GeneralLedgerMasterDataState>(
    initialState,
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPage]LoadGeneralLedgerAccountsMaster'
      ],
      (state) =>
        generalLedgerMasterDataAdapter.setAll([], {
          ...state,
          loading: true,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPI[
        '[GeneralLedgerMasterDataAPI]LoadGeneralLedgerAccountsMasterSuccess'
      ],
      (state, { GlAccountsMasters }) =>
        generalLedgerMasterDataAdapter.setAll(GlAccountsMasters, {
          ...state,
          loading: false,
          error: '',
        })
    ),
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPage]CreateGeneralLedgerAccountsMaster'
      ],
      (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
      })
    ),
    on(
      GeneralLedgerMasterDataAPI[
        '[GeneralLedgerMasterDataAPI]CreateGeneralLedgerAccountsMasterSuccess'
      ],
      (state, { GlAccountsMaster }) =>
        generalLedgerMasterDataAdapter.addOne(GlAccountsMaster, {
          ...state,
          loading: false,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPI[
        '[GeneralLedgerMasterDataAPI]CreateGeneralLedgerAccountsMasterFail'
      ],
      (state, { errorMessage }) => ({
        ...state,
        loading: false,
        errorMessage: errorMessage,
      })
    ),
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPage]EditGeneralLedgerAccountsMaster'
      ],
      (state) => ({ ...state, loading: true, errorMessage: '' })
    ),
    on(
      GeneralLedgerMasterDataAPI[
        '[GeneralLedgerMasterDataAPI]EditGeneralLedgerAccountsMasterSuccess'
      ],
      (state, { GlAccountMaster }) =>
        generalLedgerMasterDataAdapter.updateOne(GlAccountMaster, {
          ...state,
          loading: false,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPI[
        '[GeneralLedgerMasterDataAPI]EditGeneralLedgerAccountsMasterFail'
      ],
      (state, { errorMessage }) => ({
        ...state,
        loading: false,
        errorMessage: errorMessage,
      })
    ),
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPage]DeleteGeneralLedgerAccountsMaster'
      ],
      (state) => ({ ...state, loading: false, errorMessage: '' })
    ),
    on(
      GeneralLedgerMasterDataAPI[
        '[GeneralLedgerMasterDataAPI]DeleteGeneralLedgerAccountsMasterSuccess'
      ],
      (state, { GlAccountMasterId }) =>
        generalLedgerMasterDataAdapter.removeOne(GlAccountMasterId, {
          ...state,
          loading: false,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPI[
        '[GeneralLedgerMasterDataAPI]DeleteGeneralLedgerAccountsMasterFail'
      ],
      (state, { errorMessage }) => ({
        ...state,
        loading: false,
        errorMessage: errorMessage,
      })
    )
  );
