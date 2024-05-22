import {
  Comparer,
  EntityAdapter,
  IdSelector,
  createEntityAdapter,
} from '@ngrx/entity';
import { GeneralLedgerMasterDataInterface } from '../../finance-Folder/finance-models/fi-data-models/gl-account-master-model';

export const selectId: IdSelector<GeneralLedgerMasterDataInterface> = ({
  id,
}) => id;

export const sortByTitle: Comparer<GeneralLedgerMasterDataInterface> = (
  s1,
  s2
) => s1.shortDescription.localeCompare(s2.shortDescription);

export const generalLedgerMasterDataInterfaceAdapter: EntityAdapter<GeneralLedgerMasterDataInterface> =
  createEntityAdapter<GeneralLedgerMasterDataInterface>({
    selectId,
    sortComparer: sortByTitle,
  });
