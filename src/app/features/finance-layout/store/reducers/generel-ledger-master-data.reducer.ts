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
    GeneralLedgerMasterDataFieldNames: {
      id: NaN,
      accountNumber: NaN,
      companyCode: 'Company Code',
      chartOfAccounts: 'Chart of Accounts',
      accountGroup: 'Account Group',
      accountType: 'Account Type',
      reconciliationAccountInput: false,
      reconciliationAccountType: 'Reconciliation Account Type',
      alternativeGLAccount: NaN,
      shortDescription: 'Short Description',
      longDescription: 'Long Description',
      profitAndLossAccount: false,
      balanceSheetAccount: true,
      accountCurrency: 'Account Currency',
      balancesInLocalCurrency: true,
      exchangeRateKey: 'Exchange Rate Key',
      taxCategory: 'Tax Category',
      postingWithoutTaxAllowed: true,
      openItemManagement: true,
      lineItemManagement: true,
      blockedForPosting: false,
      markedForDeletion: false,
      groupAccountNumber: NaN,
      tradingPartner: 'Trading Partner',
      sortKey: 'Sort Key',
      authorizationGroup: 'Authorization Group',
      fieldStatusGroup: 'Field Status Group',
      postAutomaticallyOnly: false,
      relevantToCashFlow: true,
      houseBank: 'house Bank',
      houseBankAccountID: NaN,
      // interestIndicator: boolean;
      // interestCalculationFrequency: number;
      // lastDateOfInterestCalculation: Date;
      // keyDateofLastInterest: Date;
      controllingArea: 'Controlling Area',
      costElement: NaN,
      unitOfMeasure: 'Unit Of Measure',
      businessArea: 'Business Area',
      valuationGroup: 'Valuation Group',
      inflationKey: 'Inflation Key',
      toleranceGroup: 'Tolerance Group',
      planningLevel: 'Planning Level',
      accountManagedinExternalSystem: NaN,
      supplementAutomaticPostings: true
    },
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
          GeneralLedgerMasterDataFieldNames:
            initialState.GeneralLedgerMasterDataFieldNames,
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
          GeneralLedgerMasterDataFieldNames:
            initialState.GeneralLedgerMasterDataFieldNames,
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
        GeneralLedgerMasterDataFieldNames:
          initialState.GeneralLedgerMasterDataFieldNames,
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
          GeneralLedgerMasterDataFieldNames:
            initialState.GeneralLedgerMasterDataFieldNames,
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
        GeneralLedgerMasterDataFieldNames:
          initialState.GeneralLedgerMasterDataFieldNames,
      })
    ),
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]EditGeneralLedgerAccountsMaster'
      ],
      (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
        GeneralLedgerMasterDataFieldNames:
          initialState.GeneralLedgerMasterDataFieldNames,
      })
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
          GeneralLedgerMasterDataFieldNames:
            initialState.GeneralLedgerMasterDataFieldNames,
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
        GeneralLedgerMasterDataFieldNames:
          initialState.GeneralLedgerMasterDataFieldNames,
      })
    ),
    on(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]DeleteGeneralLedgerAccountsMaster'
      ],
      (state) => ({
        ...state,
        loading: false,
        errorMessage: '',
        GeneralLedgerMasterDataFieldNames:
          initialState.GeneralLedgerMasterDataFieldNames,
      })
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
          GeneralLedgerMasterDataFieldNames:
            initialState.GeneralLedgerMasterDataFieldNames,
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
        GeneralLedgerMasterDataFieldNames:
          initialState.GeneralLedgerMasterDataFieldNames,
      })
    )
  );
