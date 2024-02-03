import { Injectable } from '@angular/core';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GeneralLedgerMasterDataPageActions,
  GeneralLedgerMasterDataAPIActions,
} from '../actions/master-data/gl-master-data.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class GeneralLedgerMasterDataEffect {
  public LoadGeneralLedgerAccountsMaster$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        GeneralLedgerMasterDataPageActions[
          '[GeneralLedgerMasterDataPageActions]LoadGeneralLedgerAccountsMaster'
        ]
      ),
      exhaustMap(() =>
        this._financeService.fetchGeneralLedgerAccountsList().pipe(
          map((GlAccountsMasters) => {
            return GeneralLedgerMasterDataAPIActions[
              '[GeneralLedgerMasterDataAPIActions]LoadGeneralLedgerAccountsMasterSuccess'
            ]({
              GlAccountsMasters,
            });
          }),
          catchError((error: string) =>
            of(
              GeneralLedgerMasterDataAPIActions[
                '[GeneralLedgerMasterDataAPIActions]LoadGeneralLedgerAccountsMasterFailure'
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
