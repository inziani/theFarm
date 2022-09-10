import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { FinanceService } from '@app/core/services/finance.service';
import { CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';
import { Currency, Language } from '@app/finance/finance-interfaces/finance-interfaces';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';


@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.css']
})
export class CompanyDialogComponent implements OnInit {

  public readonly!: boolean;
  public isLoading: boolean = false;
  public formSubmitted: boolean = false;
  public formGroup = new CompanyMasterDataFormGroup();
  public company!: CompanyMasterDataModel;
  public language: Language[] = [
    { value: 'en', viewValue: 'English' },
    { value: 'swa', viewValue: 'Kiswahili' },
    { value: 'fr', viewValue: 'French' },
    { value: 'es', viewValue: 'Spanish' },
    { value: 'de', viewValue: 'Germany' }
  ];
  public currency: Currency[] = [
    { value: 'KSH', viewValue: 'Kenya Shilling' },
    { value: 'UGX', viewValue: 'Uganda Shilling' },
    { value: 'TZS', viewValue: 'Tanzania Shilling' },
    { value: 'USD', viewValue: 'US Dollar' },
    { value: 'GBP', viewValue: 'British Pound' },
  ];
  public errorMessage!: string;

  constructor(
    public dialog: MatDialog,
    private restData: RestDataSource,
    private financeService: FinanceService,
    private dialogRef: MatDialogRef<CompanyDialogComponent>
  ) {


  }

  ngOnInit(): void {
    this.readonly = true;
  }

  onCreateCompany() {
    this.readonly = !this.readonly;
  }

  onSave() {

    this.company = this.formGroup.value;
    this.financeService.createCompanyMasterData(
      this.company.company, this.company.companyName, this.company.street, this.company.postOfficeBox, this.company.postalCode, this.company.country, this.company.language, this.company.currency, this.company.landLine, this.company.mobileNumber, this.company.email
    ).subscribe(companyCreated => {
      if (companyCreated) {
        // Dialogue open
        this.dialog.open(ChangesSavedDialogComponent);
      }
    });
    this.formGroup.reset();
    this.formSubmitted = false;
  }

}