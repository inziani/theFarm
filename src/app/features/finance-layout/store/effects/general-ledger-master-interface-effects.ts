import { Injectable } from '@angular/core';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GeneralLedgerMasterDataPageActions,
  GeneralLedgerMasterDataAPIActions,
} from '../actions/master-data/gl-master-data.actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { GeneralLedgerMasterData } from '../../finance-Folder/finance-models/fi-data-models/gl-account-master-model';

@Injectable()
export class GeneralLedgerMasterDataInterfaceEffects {
  public LoadGeneralLedgerAccountsMasterInterface$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        GeneralLedgerMasterDataPageActions[
          '[GeneralLedgerMasterDataPageActions]LoadGeneralLedgerAccountsMasterInterface'
        ]
      ),
      exhaustMap(() =>
        this._financeService.fetchGeneralLedgerAccountsListInterface().pipe(
          map((GlAccountsMastersInterface) => {
            console.log(
              'Effects General Ledger Master Interface - ',
              GlAccountsMastersInterface
            );
            return GeneralLedgerMasterDataAPIActions[
              '[GeneralLedgerMasterDataAPIActions]LoadGeneralLedgerAccountsMasterInterfaceSuccess'
            ]({
              GlAccountsMastersInterface,
            });
          }),
          catchError((error: string) =>
            of(
              GeneralLedgerMasterDataAPIActions[
                '[GeneralLedgerMasterDataAPIActions]LoadGeneralLedgerAccountsMasterInterfaceFailure'
              ]({ errorMessage: error })
            )
          )
        )
      )
    );
  });

  constructor(
    private _actions$: Actions,
    private _financeService: FinanceService
  ) {}
}
