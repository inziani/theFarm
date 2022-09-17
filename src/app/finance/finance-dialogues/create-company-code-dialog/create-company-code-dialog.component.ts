import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { CompanyCodeMasterDataModel, CompanyMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { CompanyCodeMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-create-company-code-dialog',
  templateUrl: './create-company-code-dialog.component.html',
  styleUrls: ['./create-company-code-dialog.component.css']
})
export class CreateCompanyCodeDialogComponent implements OnInit {

  public readonly!: boolean;
  public isLoading: boolean = false;
  public formSubmitted: boolean = false;
  public formGroup = new CompanyCodeMasterDataFormGroup();
  public companyCode!: CompanyCodeMasterDataModel;
  public companyList!: CompanyMasterDataModel[];

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateCompanyCodeDialogComponent>,
    private financeService: FinanceService
  ) { }

  ngOnInit(): void {
    this.financeService.fetchCompanyData().subscribe(companyList => {
      this.companyList = companyList;
    })
  }

  public onSave() {
    this.dialogRef.close(this.formGroup.value);
    this.companyCode = this.formGroup.value;
    this.financeService
      .createCompanyCodeMasterData(
        this.companyCode.companyCode,
        this.companyCode.companyCodeName,
        this.companyCode.company
      )
      .subscribe((companyCreated) => {
        if (companyCreated) {
          this.dialog.open(ChangesSavedDialogComponent);
        }
      });
    this.formGroup.reset();
    this.formSubmitted = false;
  };  close() {
    this.dialogRef.close();
  }

}
