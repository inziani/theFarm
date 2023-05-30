import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { CompanyCodeMasterData } from '@app/features/finance/finance-models/fi-data-models/organization-data-models';

@Component({
  selector: 'app-delete-company-code-dialog',
  templateUrl: './delete-company-code-dialog.component.html',
  styleUrls: ['./delete-company-code-dialog.component.css'],
})
export class DeleteCompanyCodeDialogComponent implements OnInit {
  public companyCode!: CompanyCodeMasterData;

  constructor(
    private _financeService: FinanceService,
    private _dialogRef: MatDialogRef<DeleteCompanyCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public companyCodeData: CompanyCodeMasterData,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.companyCode = this.companyCodeData;
  }

  public onDelete() {
    this._financeService
      .deleteCompanyCode(this.companyCodeData.id)
      .subscribe((companyCodeDeleted) => {
        if (companyCodeDeleted) {
        } else {
          this._dialog.open(ChangesSavedDialogComponent);
        }
      });
  }

  close() {
    this._dialogRef.close();
  }
}
