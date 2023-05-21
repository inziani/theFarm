import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';

import { CompanyMasterData } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-delete-company-dialog',
  templateUrl: './delete-company-dialog.component.html',
  styleUrls: ['./delete-company-dialog.component.css']
})
export class DeleteCompanyDialogComponent implements OnInit {

  public company!: CompanyMasterData;
  public formGroup = new CompanyMasterDataFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;


  constructor(

    public _financeService: FinanceService,
    public _dialog: MatDialog,
    private _dialogRef: MatDialogRef<DeleteCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public companyData: CompanyMasterData,

  ) {

  }
  ngOnInit(): void {

    this.company = this.companyData;
  }

  public onDelete() {
    this._financeService
      .deleteCompany(
        this.companyData.id
      )
      .subscribe((companyDeleted) => {
        if (companyDeleted) {
          console.log(companyDeleted)
        } else {
          this._dialog.open(ChangesSavedDialogComponent);
        }
      });
  }

  close() {
    this._dialogRef.close();
  }

}
