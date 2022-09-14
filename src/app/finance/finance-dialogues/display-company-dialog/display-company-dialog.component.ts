import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency, Language } from '@app/finance/finance-interfaces/finance-interfaces';
import { CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-display-company-dialog',
  templateUrl: './display-company-dialog.component.html',
  styleUrls: ['./display-company-dialog.component.css']
})
export class DisplayCompanyDialogComponent implements OnInit {
  public formSubmitted: boolean = false;
  public formGroup = new CompanyMasterDataFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public language: Language[] = [
    { value: "en", viewValue: "English" },
    { value: "swa", viewValue: "Kiswahili" },
    { value: "fr", viewValue: "French" },
    { value: "es", viewValue: "Spanish" },
    { value: "de", viewValue: "Germany" },
  ];
  public currency: Currency[] = [
    { value: "KSH", viewValue: "Kenya Shilling" },
    { value: "UGX", viewValue: "Uganda Shilling" },
    { value: "TZS", viewValue: "Tanzania Shilling" },
    { value: "USD", viewValue: "US Dollar" },
    { value: "GBP", viewValue: "British Pound" },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public companyData: CompanyMasterDataModel
  ) { }

  ngOnInit(): void {
    this.readonly = true;
    this.formGroup.patchValue(this.companyData);
  }

}
