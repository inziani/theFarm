import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { CompanyCodeMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';

@Component({
  selector: 'app-delete-company-code-dialog',
  templateUrl: './delete-company-code-dialog.component.html',
  styleUrls: ['./delete-company-code-dialog.component.css']
})
export class DeleteCompanyCodeDialogComponent implements OnInit {
  public companyCode!: CompanyCodeMasterDataModel;

  constructor(
    private financeService: FinanceService,
    private dialogRef: MatDialogRef<DeleteCompanyCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public companyCodeData: CompanyCodeMasterDataModel,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.companyCode = this.companyCodeData;
  }

   public onDelete() {
    this.financeService
      .deleteCompanyCode(
        this.companyCodeData.id
      )
      .subscribe((companyCodeDeleted) => {
        if (companyCodeDeleted) {
        } else {
          this.dialog.open(ChangesSavedDialogComponent);
        }
      });
   }

  close() {
    this.dialogRef.close();
  }

}