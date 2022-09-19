import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceService } from '@app/core/services/finance.service';

import { CompanyCodeMasterDataModel, CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyCodeMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-display-company-code-dialog',
  templateUrl: './display-company-code-dialog.component.html',
  styleUrls: ['./display-company-code-dialog.component.css']
})

export class DisplayCompanyCodeDialogComponent implements OnInit {

  public readonly!: boolean;
  public isLoading: boolean = false;
  public formSubmitted: boolean = false;
  public formGroup = new CompanyCodeMasterDataFormGroup();
  public companyCode!: CompanyCodeMasterDataModel;
  public companyList!: CompanyMasterDataModel[];


  constructor(
    private dialogRef: MatDialogRef<DisplayCompanyCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public companyCodeMasterData: CompanyCodeMasterDataModel,
    private financeService: FinanceService
  ) { }

  ngOnInit(): void {
    this.financeService.fetchCompanyData().subscribe(companyList => {
      this.companyList = companyList;
    });
    this.readonly = true;
    this.formGroup.patchValue(this.companyCodeMasterData);
  }

 close() {
    this.dialogRef.close();
  }

}
