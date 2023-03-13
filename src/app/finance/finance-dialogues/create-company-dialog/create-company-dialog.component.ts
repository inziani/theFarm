import { Component, OnInit } from '@angular/core';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { Currency, Language } from '@app/finance/finance-interfaces/finance-interfaces';
import { CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

let phoneNumberUtil = PhoneNumberUtil.getInstance();

@Component({
  selector: 'app-create-company-dialog',
  templateUrl: './create-company-dialog.component.html',
  styleUrls: ['./create-company-dialog.component.css'],
})
export class CreateCompanyDialogComponent implements OnInit {
  public formSubmitted: boolean = false;
  public isLoading!: boolean;
  public readonly!: boolean;
  public formGroup = new CompanyMasterDataFormGroup();
  public company!: CompanyMasterDataModel;
  public language: Language[] = [
    { value: 'en', viewValue: 'English' },
    { value: 'swa', viewValue: 'Kiswahili' },
    { value: 'fr', viewValue: 'French' },
    { value: 'es', viewValue: 'Spanish' },
    { value: 'de', viewValue: 'Germany' },
  ];
  public currency: Currency[] = [
    { value: 'KSH', viewValue: 'Kenya Shilling' },
    { value: 'UGX', viewValue: 'Uganda Shilling' },
    { value: 'TZS', viewValue: 'Tanzania Shilling' },
    { value: 'USD', viewValue: 'US Dollar' },
    { value: 'GBP', viewValue: 'British Pound' },
  ];
  public errorMessage!: string;
  public countryPhoneCodes!: number[];
  public selectedCountryCode!: number;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateCompanyDialogComponent>,
    public financeService: FinanceService
  ) {}

  ngOnInit(): void {}

  public onSave() {
    this.dialogRef.close(this.formGroup.value);
    this.company = this.formGroup.value;
    this.financeService
      .createCompanyMasterData(
        this.company.company,
        this.company.companyName,
        this.company.street,
        this.company.postOfficeBox,
        this.company.postalCode,
        this.company.country,
        this.company.language,
        this.company.currency,
        this.company.landLine,
        this.company.mobileNumber,
        this.company.email
      )
      .subscribe({
        next: (companyCreated) => {
          this.dialog.open(ChangesSavedDialogComponent, {
            data: (this.company = companyCreated),
          });
        },
        error: (err) => {
          console.log('Phonnumber error message-', err);
          this.errorMessage = err;
        },
        complete: () => console.info('Complete'),
      });
    this.formGroup.reset();
    this.formSubmitted = false;
  }

  close() {
    this.dialogRef.close();
  }
  // ========================https://senoritadeveloper.medium.com/i18n-phone-number-validation-in-angular-81759441dd5a=======
  public internationalCountryPhoneCodes(): void {
    let countries: string[] = phoneNumberUtil.getSupportedRegions();
    this.countryPhoneCodes.push(90);
    countries.forEach((country) => {
      let countryCode = phoneNumberUtil.getCountryCodeForRegion(country);
      if (this.countryPhoneCodes.indexOf(countryCode) === -1) {
        this.countryPhoneCodes.push(countryCode);
      }
    });
    this.countryPhoneCodes.sort((a, b) => (a > b ? 1 : -1));
    // this.selectedCountryCode = this.getCountryCode();
  }
  // =========================================================================================================================
}
