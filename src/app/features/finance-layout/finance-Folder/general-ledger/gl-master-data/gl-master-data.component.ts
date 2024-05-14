import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// import { IsoDatePipe } from '@app/_helpers/pipes/iso-date.pipe';

import {
  GLAccountGroupMasterData,
  GLMasterDataFormGroup,
} from '@app/features/finance-layout/finance-Folder/finance-models/fi-form-models/gl-master-data-model';
import {
  ProfitAndLossAccountType,
  ReconciliationAccountType,
} from '@app/features/finance-layout/finance-Folder/finance-interfaces/finance-interfaces';
import { SearchDialogComponent } from '@app/features/finance-layout/finance-Folder/finance-dialogues/search-dialog/search-dialog.component';
import { GeneralLedgerMasterData } from '@app/features/finance-layout/finance-Folder/finance-models/fi-data-models/gl-account-master-model';
import { FinanceService } from '@app/_helpers/services/finance.service';
// import { NumberRangesService } from '@app/shared/data/number-ranges.service';
import {
  CompanyCodeMasterData,
  ChartOfAccountsMasterData,
  GLAccountGroup,
  BusinessAreaMasterData,
  ControllingAreaMasterData,
} from '@app/features/finance-layout/finance-Folder/finance-models/fi-data-models/organization-data-models';
import { GeneralLedgerMasterDataState } from '@app/features/finance-layout/store/state/master-data/gl-master-data.state';
import { Store } from '@ngrx/store';
import { GeneralLedgerMasterDataPageActions } from '@app/features/finance-layout/store/actions/master-data/gl-master-data.actions';
import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';

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
    { value: 'Materials', viewValue: 'Materials' },
    { value: 'General Ledger', viewValue: 'General Ledger' },
  ];

  public GeneralLedgerAccountMaster!: GeneralLedgerMasterData;
  public readonly!: boolean;
  public errorMessage!: string;
  public accNum!: number;
  public companyCode!: CompanyCodeMasterData[];
  public chartOfAccounts!: ChartOfAccountsMasterData[];
  public glAccountGroup!: GLAccountGroup;
  public glAccountsMasterList!: GeneralLedgerMasterData[];
  public BusinessArea!: BusinessAreaMasterData[];
  public ControllingArea!: ControllingAreaMasterData[];
  public accountType!: boolean;

  public FinancialStatementAccount = [
    {
      label: 'Profit and Loss Account',
      value: 'Profit and Loss Account',
    },
    {
      label: 'Balance Sheet Account',
      value: 'Balance Sheet Account',
    },
  ];

  public Currency = [
    {
      label: 'Kenya Shilling',
      value: 'KSH',
    },
    {
      label: 'Uganda Shilling',
      value: 'UGX',
    },
    {
      label: 'Tanzania Shilling',
      value: 'TZS',
    },
    {
      label: 'United States Dollar',
      value: 'USD',
    },
    {
      label: 'British Pound',
      value: 'GBP',
    },
  ];

  public ACCOUNTTYPE = [
    {
      label: 'ASSETS',
      value: 'Assets',
    },

    {
      value: 'Accounts Payable',
      label: 'PAYABLES',
    },
    {
      label: 'RECEIVABLES',
      value: 'Accounts Receivable',
    },
    {
      label: 'MATERIALS',
      value: 'Materials',
    },
    {
      label: 'GL',
      value: 'General Ledger',
    },
  ];

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

    this._financeService.fetchBusinessAreaData().subscribe({
      next: (businessArea) => (this.BusinessArea = businessArea),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
    this._financeService.fetchControllingAreaData().subscribe({
      next: (controllingArea) => (this.ControllingArea = controllingArea),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Completed'),
    });
  }

  public onRadioButtonChange(event: any) {
    // this.accountType = event.target.value;
    this.accountType = !this.accountType;
    console.log('Radio Button-', this.accountType);
  }

  public onSearchGLAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '150px';
    const dialogRef = this._dialog.open(SearchDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((success) => {
      console.log(success);
    });
  }

  public onEnableFields() {
    this.readonly = !this.readonly;
    // this._store.dispatch(
    //   GeneralLedgerMasterDataPageActions[
    //     '[GeneralLedgerMasterDataPageActions]CreateGeneralLedgerAccountsMaster'
    //   ]({ GlAccountMaster: this.GeneralLedgerAccountMaster })
    // );
  }

  public onCreateGLAccountMaster() {
    if (!this.formGroup.valid) {
      return;
    }
    this.GeneralLedgerAccountMaster = this.formGroup.value;
    this._store.dispatch(
      GeneralLedgerMasterDataPageActions[
        '[GeneralLedgerMasterDataPageActions]CreateGeneralLedgerAccountsMaster'
      ]({ GlAccountMaster: this.GeneralLedgerAccountMaster })
    );
    this._dialog.open(ObjectCreatedComponent, {
      data: this.GeneralLedgerAccountMaster.accountNumber,
    });
    this.formGroup.reset();
  }
  constructor(
    private _dialog: MatDialog,
    private _financeService: FinanceService,
    private _store: Store<GeneralLedgerMasterDataState>
  ) {}
}
