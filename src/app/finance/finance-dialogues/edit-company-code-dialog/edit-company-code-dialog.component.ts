import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { CompanyCodeMasterData, CompanyMasterData } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyCodeMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-edit-company-code-dialog',
  templateUrl: './edit-company-code-dialog.component.html',
  styleUrls: ['./edit-company-code-dialog.component.css']
})
export class EditCompanyCodeDialogComponent implements OnInit {

  public readonly!: boolean;
  public isLoading: boolean = false;
  public formSubmitted: boolean = false;
  public formGroup = new CompanyCodeMasterDataFormGroup();
  public companyCode!: CompanyCodeMasterData;
  public companyList!: CompanyMasterData[];

  constructor(
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<EditCompanyCodeDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public companyCodeMaster: CompanyCodeMasterData,
    private _financeService: FinanceService
  ) { }

  ngOnInit(): void {
    this._financeService.fetchCompanyData().subscribe(companyList => {
      this.companyList = companyList;
    })

    this.formGroup.patchValue(this.companyCodeMaster);
  }

  public onSave() {
    this._dialogRef.close(this.formGroup.value);
    this.companyCode = this.formGroup.value;
    this._financeService
      .editCompanyCodeMasterData(
        this.companyCodeMaster.id,
        this.companyCode.companyCode,
        this.companyCode.companyCodeName,
        this.companyCode.company
      )
      .subscribe((companyCodeEdited) => {
        if (companyCodeEdited) {
          this._dialog.open(ChangesSavedDialogComponent);
        }
      });
    this.formGroup.reset();
    this.formSubmitted = false;
  };

  close() {
    this._dialogRef.close();
  }

}
