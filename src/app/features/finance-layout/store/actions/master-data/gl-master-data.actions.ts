import {
  GeneralLedgerMasterData,
  GeneralLedgerMasterDataInterface,
} from '@app/features/finance-layout/finance-Folder/finance-models/fi-data-models/gl-account-master-model';
import { Update } from '@ngrx/entity';

import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GeneralLedgerMasterDataPageActions = createActionGroup({
  source: 'General Ledger Master Data Page',
  events: {
    '[GeneralLedgerMasterDataPageActions] Load General Ledger Accounts Master':
      emptyProps(),
    '[GeneralLedgerMasterDataPageActions] Load General Ledger Accounts Master Interface':
      emptyProps(),
    '[GeneralLedgerMasterDataPageActions] Select Single General Ledger Accounts Master':
      props<{
        GlAccountMasterId: GeneralLedgerMasterData;
      }>(),
    '[GeneralLedgerMasterDataPageActions] Create General Ledger Accounts Master':
      props<{
        GlAccountMaster: GeneralLedgerMasterData;
      }>(),
    '[GeneralLedgerMasterDataPageActions] Edit General Ledger Accounts Master':
      props<{
        GlAccountMaster: GeneralLedgerMasterData;
      }>(),
    '[GeneralLedgerMasterDataPageActions] Delete General Ledger Accounts Master':
      props<{
        GlAccountMasterId: number;
      }>(),
  },
});

export const GeneralLedgerMasterDataAPIActions = createActionGroup({
  source: 'General Ledger Master Data API',
  events: {
    '[GeneralLedgerMasterDataAPIActions]  Load General Ledger Accounts Master Success':
      props<{
        GlAccountsMasters: GeneralLedgerMasterData[];
      }>(),
    '[GeneralLedgerMasterDataAPIActions]  Load General Ledger Accounts Master Failure':
      props<{
        errorMessage: string;
      }>(),

    '[GeneralLedgerMasterDataAPIActions]  Load General Ledger Accounts Master Interface Success':
      props<{
        GlAccountsMastersInterface: GeneralLedgerMasterDataInterface[];
      }>(),
    '[GeneralLedgerMasterDataAPIActions]  Load General Ledger Accounts Master Interface Failure':
      props<{
        errorMessage: string;
      }>(),
    '[GeneralLedgerMasterDataAPIActions] Create General Ledger Accounts Master Success':
      props<{
        GlAccountsMaster: GeneralLedgerMasterData;
      }>(),
    '[GeneralLedgerMasterDataAPIActions] Create  General Ledger Accounts Master Fail':
      props<{
        errorMessage: string;
      }>(),
    '[GeneralLedgerMasterDataAPIActions] Edit General Ledger Accounts Master Success':
      props<{
        GlAccountMaster: Update<GeneralLedgerMasterData>;
      }>(),
    '[GeneralLedgerMasterDataAPIActions] Edit  General Ledger Accounts Master Fail':
      props<{
        errorMessage: string;
      }>(),
    '[GeneralLedgerMasterDataAPIActions] Delete  General Ledger Accounts Master Success':
      props<{
        GlAccountMasterId: number;
      }>(),
    '[GeneralLedgerMasterDataAPIActions] Delete  General Ledger Accounts Master Fail':
      props<{
        errorMessage: string;
      }>(),
  },
});
