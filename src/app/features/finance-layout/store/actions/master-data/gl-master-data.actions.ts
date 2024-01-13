import { GeneralLedgerMasterData } from '@app/features/finance-layout/finance-Folder/finance-models/fi-data-models/gl-account-master-model';
import { Update } from '@ngrx/entity';

import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GeneralLedgerMasterDataPageActions = createActionGroup({
  source: 'General Ledger Master Data Page',
  events: {
    '[GeneralLedgerMasterDataPage] Load General Ledger Accounts Master':
      emptyProps(),
    '[GeneralLedgerMasterDataPage] Select Single General Ledger Accounts Master':
      props<{
        GlAccountMasterId: GeneralLedgerMasterData;
      }>(),
    '[GeneralLedgerMasterDataPage] Create General Ledger Accounts Master':
      props<{
        GlAccountMaster: GeneralLedgerMasterData;
      }>(),
    '[GeneralLedgerMasterDataPage] Edit General Ledger Accounts Master': props<{
      GlAccountMaster: GeneralLedgerMasterData;
    }>(),
    '[GeneralLedgerMasterDataPage] Delete General Ledger Accounts Master':
      props<{
        GlAccountMasterId: number;
      }>(),
  },
});

export const GeneralLedgerMasterDataAPI = createActionGroup({
  source: 'General Ledger Master Data API',
  events: {
    '[GeneralLedgerMasterDataAPI]  Load General Ledger Accounts Master Success':
      props<{
        GlAccountsMasters: GeneralLedgerMasterData[];
      }>(),
    '[GeneralLedgerMasterDataAPI]  Load General Ledger Accounts Master Failure':
      props<{
        errorMessage: string;
      }>(),
    '[GeneralLedgerMasterDataAPI] Create General Ledger Accounts Master Success':
      props<{
        GlAccountsMaster: GeneralLedgerMasterData;
      }>(),
    '[GeneralLedgerMasterDataAPI] Create  General Ledger Accounts Master Fail':
      props<{
        errorMessage: string;
      }>(),
    '[GeneralLedgerMasterDataAPI] Edit General Ledger Accounts Master Success':
      props<{
        GlAccountMaster: Update<GeneralLedgerMasterData>;
      }>(),
    '[GeneralLedgerMasterDataAPI] Edit  General Ledger Accounts Master Fail':
      props<{
        errorMessage: string;
      }>(),
    '[GeneralLedgerMasterDataAPI] Delete  General Ledger Accounts Master Success':
      props<{
        GlAccountMasterId: number;
      }>(),
    '[GeneralLedgerMasterDataAPI] Delete  General Ledger Accounts Master Fail':
      props<{
        errorMessage: string;
      }>(),
  },
});
