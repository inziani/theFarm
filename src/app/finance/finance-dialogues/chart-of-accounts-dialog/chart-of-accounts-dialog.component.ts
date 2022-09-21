import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { DeleteDialogComponent } from '@app/core/dialogues/delete-dialog/delete-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { Language } from '@app/finance/finance-interfaces/finance-interfaces';
import { ChartOfAccountsMasterDataModel, CompanyCodeMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { ChartOfAccountsMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-chart-of-accounts-dialog',
  templateUrl: './chart-of-accounts-dialog.component.html',
  styleUrls: ['./chart-of-accounts-dialog.component.css']
})
export class ChartOfAccountsDialogComponent implements OnInit {
  public readonly!: boolean;
  public isLoading: boolean = false;
  public formSubmitted: boolean = false;
  public formGroup = new ChartOfAccountsMasterDataFormGroup();
  public chartOfAccounts!: ChartOfAccountsMasterDataModel;
  public companyCodeList!: CompanyCodeMasterDataModel[];
  public selectedProcess!: string;
  public language: Language[] = [
    { value: "en", viewValue: "English" },
    { value: "swa", viewValue: "Kiswahili" },
    { value: "fr", viewValue: "French" },
    { value: "es", viewValue: "Spanish" },
    { value: "de", viewValue: "Germany" },
  ];

  public blockedForPosting: string = 'True'

  constructor(
    private financeService: FinanceService,
    private dialogRef: MatDialogRef<ChartOfAccountsDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public chartOfAccountsDialogueData: ChartOfAccountsMasterDataModel
  ) { }

  ngOnInit(): void {
    this.getData();
    this.financeService.fetchCompanyCodeData().subscribe(companyCodeListing => {
      this.companyCodeList = companyCodeListing;
    });
    this.chartOfAccounts = this.chartOfAccountsDialogueData;
    this.formGroup.patchValue(this.chartOfAccounts);

  }

  public getData() {
    this.financeService.data.subscribe(process => {
      this.selectedProcess = process;

    });
  }


  public onCreateChartOfAccounts() {

    // Fetch data from the dialogue and pass it on to the form- Close the dialogue too

    this.dialogRef.close(this.formGroup.value);
    this.chartOfAccounts = this.formGroup.value;

    // Post data to API through the service

    this.financeService.createChartOfAccountsMasterData(
      this.chartOfAccounts.coaCode,
      this.chartOfAccounts.companyCode,
      this.chartOfAccounts.chartOfAccountsName,
      this.chartOfAccounts.language,
      this.chartOfAccounts.lengthAccNumber,
      this.chartOfAccounts.blockedForPosting
    ).subscribe(chartOfaccountsCreated => {
      if (chartOfaccountsCreated) {
        this.dialog.open(ChangesSavedDialogComponent);
      }

    });
    this.formGroup.reset;
    this.formSubmitted = false;
  };

  public close() {
    this.dialogRef.close();
  }

  public onEditChartOfAccounts() {

  }

  public onDeleteChartOfAccounts() {
    this.financeService.
      deleteChartOfAccountsMasterData(this.chartOfAccounts.id).
      subscribe(chartOfAccountsDeleted => {
        if (chartOfAccountsDeleted) {
          this.dialog.open(DeleteDialogComponent);
        }
        else {
          alert('Deletion failed');
        }
      })

  }

}
