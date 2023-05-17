import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { CompanyCodeMasterData} from '@app/finance/finance-models/fi-data-models/organization-data-models';

@Component({
  selector: 'app-delete-company-code-dialog',
  templateUrl: './delete-company-code-dialog.component.html',
  styleUrls: ['./delete-company-code-dialog.component.css']
})
export class DeleteCompanyCodeDialogComponent implements OnInit {
  public companyCode!: CompanyCodeMasterData;

  constructor(
    private financeService: FinanceService,
    private dialogRef: MatDialogRef<DeleteCompanyCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public companyCodeData: CompanyCodeMasterData,
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
