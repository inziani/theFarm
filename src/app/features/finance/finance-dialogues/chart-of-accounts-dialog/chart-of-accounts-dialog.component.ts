import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { DeleteDialogComponent } from '@app/core/dialogues/delete-dialog/delete-dialog.component';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { ObjectCreatedComponent } from '@app/core/dialogues/object-created/object-created.component';
import { FinanceService } from '@app/core/services/finance.service';
import { Language } from '@app/features/finance/finance-interfaces/finance-interfaces';
import {
  ChartOfAccountsMasterData,
  CompanyCodeMasterData,
} from '@app/features/finance/finance-models/fi-data-models/organization-data-models';
import { ChartOfAccountsMasterDataFormGroup } from '@app/features/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-chart-of-accounts-dialog',
  templateUrl: './chart-of-accounts-dialog.component.html',
  styleUrls: ['./chart-of-accounts-dialog.component.css'],
})
export class ChartOfAccountsDialogComponent implements OnInit {
  public readonly!: boolean;
  public isLoading: boolean = false;
  public formSubmitted: boolean = false;
  public formGroup = new ChartOfAccountsMasterDataFormGroup();
  public chartOfAccounts!: ChartOfAccountsMasterData;
  public companyCodeList!: CompanyCodeMasterData[];
  public selectedProcess!: string;
  public language: Language[] = [
    { value: 'en', viewValue: 'English' },
    { value: 'swa', viewValue: 'Kiswahili' },
    { value: 'fr', viewValue: 'French' },
    { value: 'es', viewValue: 'Spanish' },
    { value: 'de', viewValue: 'Germany' },
  ];

  public blockedForPosting: string = 'True';
  public notBlockedForPosting = 'False';
  public disabled!: boolean;
  public errorMessage!: string;
  public createdItem!: string;
  public changedItem!: string;
  public deletedItem!: string;

  constructor(
    private _financeService: FinanceService,
    private _dialogRef: MatDialogRef<ChartOfAccountsDialogComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public chartOfAccountsDialogueData: ChartOfAccountsMasterData
  ) {}

  ngOnInit(): void {
    this.getData();
    this._financeService.fetchCompanyCodeData().subscribe({
      next: (companyCodeListing) => (this.companyCodeList = companyCodeListing),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('completed'),
    });
    this.chartOfAccounts = this.chartOfAccountsDialogueData;
    this.formGroup.patchValue(this.chartOfAccounts);
    this.readonly = true;
    this.disabled = true;
  }

  public getData() {
    this._financeService.data.subscribe({
      next: (process) => (this.selectedProcess = process),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }

  public onCreateChartOfAccounts() {
    // Fetch data from the dialogue and pass it on to the form- Close the dialogue too

    this._dialogRef.close(this.formGroup.value);
    this.chartOfAccounts = this.formGroup.value;

    // Post data to API through the service

    this._financeService
      .createChartOfAccountsMasterData(
        this.chartOfAccounts.coaCode,
        this.chartOfAccounts.companyCode,
        this.chartOfAccounts.chartOfAccountsName,
        this.chartOfAccounts.language,
        this.chartOfAccounts.lengthAccNumber,
        this.chartOfAccounts.blockedForPosting
      )
      .subscribe({
        next: (chartOfAccountsCreated) =>
          this._dialog.open(ObjectCreatedComponent, {
            data: (this.createdItem =
              chartOfAccountsCreated.chartOfAccountsName),
          }),
        error: (err) =>
          this._dialog.open(ErrorHandlingDialogComponent, {
            data: (this.errorMessage = err),
          }),
        complete: () => console.info('complete'),
      });
    this.formGroup.reset;
    this.formSubmitted = false;
  }

  public onEditChartOfAccounts() {
    this._dialogRef.close(this.formGroup.value);
    this.chartOfAccounts = this.formGroup.value;
    this._financeService
      .editSingleChartOfAccountsMasterData(
        this.chartOfAccountsDialogueData.id,
        this.chartOfAccounts.coaCode,
        this.chartOfAccounts.companyCode,
        this.chartOfAccounts.chartOfAccountsName,
        this.chartOfAccounts.language,
        this.chartOfAccounts.lengthAccNumber,
        this.chartOfAccounts.blockedForPosting
      )
      .subscribe({
        next: (chartOfAccountsEdited) =>
          this._dialog.open(ChangesSavedDialogComponent, {
            data: (this.changedItem =
              chartOfAccountsEdited.chartOfAccountsName),
          }),
        error: (err) =>
          this._dialog.open(ErrorHandlingDialogComponent, {
            data: (this.errorMessage = err),
          }),
        complete: () => console.info('complete'),
      });
    this.formGroup.reset();
    this.formSubmitted = false;
  }

  public onDeleteChartOfAccounts() {
    this._financeService
      .deleteChartOfAccountsMasterData(this.chartOfAccounts.id)
      .subscribe({
        next: (chartOfAccountsDeleted) =>
          this._dialog.open(DeleteDialogComponent, {
            data: (this.deletedItem = this.chartOfAccounts.chartOfAccountsName),
          }),
        error: (err) =>
          this._dialog.open(ErrorHandlingDialogComponent, {
            data: (this.errorMessage = err),
          }),
        complete: () => console.info('complete'),
      });
  }

  public close() {
    this._dialogRef.close();
  }
}
