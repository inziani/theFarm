import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { IsoDatePipe } from '@app/_helpers/iso-date.pipe';

import {
  GLAccountGroupMasterData,
  GLMasterDataFormGroup,
} from '@app/finance/finance-models/fi-form-models/gl-master-data-model';
import {

  ProfitAndLossAccountType,
  ReconciliationAccountType
} from '@app/finance/finance-interfaces/finance-interfaces';
import { SearchDialogComponent } from '@app/finance/finance-dialogues/search-dialog/search-dialog.component';
import { GeneralLedgerMasterData } from '@app/finance/finance-models/fi-data-models/gl-account-master-model';
import { FinanceService } from '@app/core/services/finance.service';
import { ObjectCreatedComponent } from '@app/core/dialogues/object-created/object-created.component';
import { NumberRangesService } from '@app/core/shared/data/number-ranges.service';
import {
  CompanyCodeMasterData,
  ChartOfAccountsMasterData,
  GLAccountGroup
} from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gl-master-data',
  templateUrl: './gl-master-data.component.html',
  styleUrls: ['./gl-master-data.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GlMasterDataComponent implements OnInit {
  public isLoading: boolean = false;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public formGroup = new GLMasterDataFormGroup();
  public formGroupAcctGrp = new GLAccountGroupMasterData();
  public pnlAccountType: ProfitAndLossAccountType[] = [
    { value: 'Revenue', viewValue: 'Revenue' },
    { value: 'Expense', viewValue: 'Expense' },
  ];
  public reconciliationAcctType: ReconciliationAccountType[] = [
    { value: 'Assets', viewValue: 'Assets' },
    { value: 'Accounts Payable', viewValue: 'Accounts Payable' },
    { value: 'Accounts Receivable', viewValue: 'Accounts Receivable' },
    { value: 'Petty Cash', viewValue: 'Petty Cash' },
    { value: 'Banks', viewValue: 'Banks' },
    { value: 'Materials Management', viewValue: 'Materials Management' },
  ];
  public generalLedgerAccountMaster!: GeneralLedgerMasterData;
  public readonly!: boolean;
  public errorMessage!: string;
  public accountNumber!: number;
  public accNum!: number;
  public companyCode!: CompanyCodeMasterData[];
  public chartOfAccounts!: ChartOfAccountsMasterData[];
  public glAccountGroup!: GLAccountGroup;

  constructor(
    private _dialog: MatDialog,
    private _financeService: FinanceService,
    private _datePipe: IsoDatePipe,
    private _numberRanges: NumberRangesService
  ) {}

  ngOnInit(): void {
    this.readonly = true;
    this._financeService.fetchCompanyCodeData().subscribe({
      next: (companyCode) => {
        this.companyCode = companyCode;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complate'),
    });
    this._financeService.fetchChartOfAccountsData().subscribe({
      next: (chartOfAccounts) => {
        this.chartOfAccounts = chartOfAccounts;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complate'),
    });
  }

  public onCreate() {
    this._numberRanges.createGLAccNum();
    this.accountNumber = this._numberRanges.glAccountNumber;
    console.log('AccNum in direct fetch Component - ', this.accountNumber);
  }

  public onSearchGLAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '150px';
    const dialogRef = this._dialog.open(SearchDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((success) => {
      // alert(success);
    });
  }

  public onEnableFields() {
    this.readonly = !this.readonly;
  }

  public onCreateGLAccountMaster() {
    this._numberRanges.createGLAccNum();
    this.generalLedgerAccountMaster = this.formGroup.value;
    return this._financeService
      .createGeneralLedgerAccountMasterData(
        (this.generalLedgerAccountMaster.accountNumber =
          this._numberRanges.glAccountNumber),
        this.generalLedgerAccountMaster.companyCode,
        this.generalLedgerAccountMaster.chartOfAccounts,
        this.generalLedgerAccountMaster.accountGroup,
        this.generalLedgerAccountMaster.accountType,
        this.generalLedgerAccountMaster.reconciliationAccountInput,
        this.generalLedgerAccountMaster.reconciliationAccountType,
        this.generalLedgerAccountMaster.alternativeGLAccount,
        this.generalLedgerAccountMaster.shortDescription,
        this.generalLedgerAccountMaster.longDescription,
        this.generalLedgerAccountMaster.profitAndLossAccount,
        this.generalLedgerAccountMaster.balanceSheetAccount,
        this.generalLedgerAccountMaster.accountCurrency,
        this.generalLedgerAccountMaster.balancesInLocalCurrency,
        this.generalLedgerAccountMaster.exchangeRateKey,
        this.generalLedgerAccountMaster.taxCategory,
        this.generalLedgerAccountMaster.postingWithoutTaxAllowed,
        this.generalLedgerAccountMaster.openItemManagement,
        this.generalLedgerAccountMaster.lineItemManagement,
        this.generalLedgerAccountMaster.blockedForPosting,
        this.generalLedgerAccountMaster.markedForDeletion,
        this.generalLedgerAccountMaster.groupAccountNumber,
        this.generalLedgerAccountMaster.tradingPartner,
        this.generalLedgerAccountMaster.sortKey,
        this.generalLedgerAccountMaster.authorizationGroup,
        this.generalLedgerAccountMaster.fieldStatusGroup,
        this.generalLedgerAccountMaster.postAutomaticallyOnly,
        this.generalLedgerAccountMaster.relevantToCashFlow,
        this.generalLedgerAccountMaster.houseBank,
        this.generalLedgerAccountMaster.houseBankAccountID,
        this.generalLedgerAccountMaster.interestIndicator,
        this.generalLedgerAccountMaster.interestCalculationFrequency,
        this.generalLedgerAccountMaster.lastDateOfInterestCalculation,
        this.generalLedgerAccountMaster.keyDateofLastInterest,
        this.generalLedgerAccountMaster.controllingArea,
        this.generalLedgerAccountMaster.costElement,
        this.generalLedgerAccountMaster.unitOfMeasure,
        this.generalLedgerAccountMaster.businessArea,
        this.generalLedgerAccountMaster.valuationGroup,
        this.generalLedgerAccountMaster.inflationKey,
        this.generalLedgerAccountMaster.toleranceGroup,
        this.generalLedgerAccountMaster.planningLevel,
        this.generalLedgerAccountMaster.accountManagedinExternalSystem,
        this.generalLedgerAccountMaster.supplementAutomaticPostings
      )
      .subscribe({
        next: (accountMasterCreated) =>
          this._dialog.open(ObjectCreatedComponent, {
            data: (this.generalLedgerAccountMaster.accountNumber =
              accountMasterCreated.accountNumber),
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Complete'),
      });
  }

  public onAddAccountGroup(): GLAccountGroup {
    this.glAccountGroup = this.formGroupAcctGrp.value;
    return this._financeService.addGLAccountGroup(
      this.glAccountGroup.accountGroup,
      this.glAccountGroup.accountGroupDescription
    );
  }
}
