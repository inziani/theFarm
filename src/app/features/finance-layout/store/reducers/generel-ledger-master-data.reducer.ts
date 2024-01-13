import { createReducer, on } from '@ngrx/store';
import { GeneralLedgerMasterDataState } from '../state/master-data/gl-master-data.state';
import {
  GeneralLedgerMasterDataPageActions,
  GeneralLedgerMasterDataAPIActions,
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
        '[GeneralLedgerMasterDataPageActions]LoadGeneralLedgerAccountsMaster'
      ],
      (state) =>
        generalLedgerMasterDataAdapter.setAll([], {
          ...state,
          loading: true,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]LoadGeneralLedgerAccountsMasterSuccess'
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
        '[GeneralLedgerMasterDataPageActions]CreateGeneralLedgerAccountsMaster'
      ],
      (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
      })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]CreateGeneralLedgerAccountsMasterSuccess'
      ],
      (state, { GlAccountsMaster }) =>
        generalLedgerMasterDataAdapter.addOne(GlAccountsMaster, {
          ...state,
          loading: false,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]CreateGeneralLedgerAccountsMasterFail'
      ],
      (state, { errorMessage }) => ({
        ...state,
        loading: false,
        errorMessage: errorMessage,
      })
    ),
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]EditGeneralLedgerAccountsMaster'
      ],
      (state) => ({ ...state, loading: true, errorMessage: '' })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]EditGeneralLedgerAccountsMasterSuccess'
      ],
      (state, { GlAccountMaster }) =>
        generalLedgerMasterDataAdapter.updateOne(GlAccountMaster, {
          ...state,
          loading: false,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]EditGeneralLedgerAccountsMasterFail'
      ],
      (state, { errorMessage }) => ({
        ...state,
        loading: false,
        errorMessage: errorMessage,
      })
    ),
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]DeleteGeneralLedgerAccountsMaster'
      ],
      (state) => ({ ...state, loading: false, errorMessage: '' })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]DeleteGeneralLedgerAccountsMasterSuccess'
      ],
      (state, { GlAccountMasterId }) =>
        generalLedgerMasterDataAdapter.removeOne(GlAccountMasterId, {
          ...state,
          loading: false,
          errorMessage: '',
        })
    ),
    on(
      GeneralLedgerMasterDataAPIActions[
        '[GeneralLedgerMasterDataAPIActions]DeleteGeneralLedgerAccountsMasterFail'
      ],
      (state, { errorMessage }) => ({
        ...state,
        loading: false,
        errorMessage: errorMessage,
      })
    )
  );
