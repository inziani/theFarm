import {
  Comparer,
  EntityAdapter,
  IdSelector,
  createEntityAdapter,
} from '@ngrx/entity';
import { GeneralLedgerMasterData } from '../../finance-Folder/finance-models/fi-data-models/gl-account-master-model';

export const selectId: IdSelector<GeneralLedgerMasterData> = ({ id }) => id;
export const sortByTitle: Comparer<GeneralLedgerMasterData> = (s1, s2) =>
  s1.shortDescription.localeCompare(s2.shortDescription);
export const generalLedgerMasterDataAdapter: EntityAdapter<GeneralLedgerMasterData> =
  createEntityAdapter<GeneralLedgerMasterData>({
    selectId,
    sortComparer: sortByTitle,
  });
