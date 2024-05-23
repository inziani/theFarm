import { Injectable } from '@angular/core';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GeneralLedgerMasterDataPageActions,
  GeneralLedgerMasterDataAPIActions,
} from '../actions/master-data/gl-master-data.actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class GeneralLedgerMasterDataInterfaceEffect {
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
