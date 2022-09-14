import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';

import { CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-delete-company-dialog',
  templateUrl: './delete-company-dialog.component.html',
  styleUrls: ['./delete-company-dialog.component.css']
})
export class DeleteCompanyDialogComponent implements OnInit {

  public company!: CompanyMasterDataModel;
  public formGroup = new CompanyMasterDataFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public companyData: CompanyMasterDataModel,
    public financeService: FinanceService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteCompanyDialogComponent>,

  ) {

  }
  ngOnInit(): void {

    this.company = this.companyData;
  }

  public onDelete() {
    this.financeService
      .deleteCompany(
        this.companyData.id
      )
      .subscribe((companyDeleted) => {
        if (companyDeleted) {
          console.log(companyDeleted)
        } else {
          this.dialog.open(ChangesSavedDialogComponent);
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

}
