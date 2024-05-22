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
            console.log(
              'Effects General Ledger Master Original- ',
              GlAccountsMasters
            );
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

  public CreateGeneralLedgerAccountsMaster$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        GeneralLedgerMasterDataPageActions[
          '[GeneralLedgerMasterDataPageActions]CreateGeneralLedgerAccountsMaster'
        ]
      ),
      mergeMap((action) =>
        this._financeService
          .createGeneralLedgerAccountMasterData(
            action.GlAccountMaster.accountNumber,
            action.GlAccountMaster.companyCode,
            action.GlAccountMaster.chartOfAccounts,
            action.GlAccountMaster.accountGroup,
            action.GlAccountMaster.accountType,
            action.GlAccountMaster.reconciliationAccountInput,
            action.GlAccountMaster.reconciliationAccountType,
            action.GlAccountMaster.alternativeGLAccount,
            action.GlAccountMaster.shortDescription,
            action.GlAccountMaster.longDescription,
            action.GlAccountMaster.profitAndLossAccount,
            action.GlAccountMaster.balanceSheetAccount,
            action.GlAccountMaster.accountCurrency,
            action.GlAccountMaster.balancesInLocalCurrency,
            action.GlAccountMaster.exchangeRateKey,
            action.GlAccountMaster.taxCategory,
            action.GlAccountMaster.postingWithoutTaxAllowed,
            action.GlAccountMaster.openItemManagement,
            action.GlAccountMaster.lineItemManagement,
            action.GlAccountMaster.blockedForPosting,
            action.GlAccountMaster.markedForDeletion,
            action.GlAccountMaster.groupAccountNumber,
            action.GlAccountMaster.tradingPartner,
            action.GlAccountMaster.sortKey,
            action.GlAccountMaster.authorizationGroup,
            action.GlAccountMaster.fieldStatusGroup,
            action.GlAccountMaster.postAutomaticallyOnly,
            action.GlAccountMaster.relevantToCashFlow,
            action.GlAccountMaster.houseBank,
            action.GlAccountMaster.houseBankAccountID,
            action.GlAccountMaster.controllingArea,
            action.GlAccountMaster.costElement,
            action.GlAccountMaster.unitOfMeasure,
            action.GlAccountMaster.businessArea,
            action.GlAccountMaster.valuationGroup,
            action.GlAccountMaster.inflationKey,
            action.GlAccountMaster.toleranceGroup,
            action.GlAccountMaster.planningLevel,
            action.GlAccountMaster.accountManagedinExternalSystem,
            action.GlAccountMaster.supplementAutomaticPostings
          )
          .pipe(
            map(
              // (GlAccountsMasters) =>
              (GlAccountsMasters: GeneralLedgerMasterData) =>
                GeneralLedgerMasterDataAPIActions[
                  '[GeneralLedgerMasterDataAPIActions]CreateGeneralLedgerAccountsMasterSuccess'
                ]({
                  GlAccountsMaster: GlAccountsMasters,
                })

              // {
              //   console.log('Is the effect being called - ', GlAccountsMasters);
              //   return GeneralLedgerMasterDataAPIActions[
              //     '[GeneralLedgerMasterDataAPIActions]CreateGeneralLedgerAccountsMasterSuccess'
              //   ]({
              //     GlAccountsMaster: GlAccountsMasters,
              //   });
              // }
            ),
            catchError((error: string) =>
              of(
                GeneralLedgerMasterDataAPIActions[
                  '[GeneralLedgerMasterDataAPIActions]CreateGeneralLedgerAccountsMasterFail'
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
