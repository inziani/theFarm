import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { DeleteDialogComponent } from '@app/core/dialogues/delete-dialog/delete-dialog.component';
import { ObjectCreatedComponent } from '@app/core/dialogues/object-created/object-created.component';
import { FinanceService } from '@app/core/services/finance.service';
import { TaxCode } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { GLMasterDataTaxCodeFormGroup } from '@app/finance/finance-models/fi-form-models/gl-master-data-model';

@Component({
  selector: 'app-tax-code-dialog',
  templateUrl: './tax-code-dialog.component.html',
  styleUrls: ['./tax-code-dialog.component.css'],
})
export class TaxCodeDialogComponent {
  public selectedProcess!: string;
  public errorMessage!: string;
  public formGroup = new GLMasterDataTaxCodeFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public taxCode!: TaxCode;
  public objectCreated!: string;
  public objectChanged!: string;



  constructor(
    private _financeService: FinanceService,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private taxCodeData: TaxCode,
    private _dialogRef: MatDialogRef<TaxCodeDialogComponent>,
    
  ) {
    this.taxCode = this.taxCodeData;
  }

  ngOnInit() {
    this.readonly = !this.readonly;
    this._financeService.data.subscribe({
      next: (data) => (this.selectedProcess = data),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Data has been sent'),
    });

    this.formGroup.patchValue(this.taxCodeData);
  }

  public onCreateTaxCode() {
    this._dialogRef.close(this.formGroup.value);
    this.taxCode = this.formGroup.value;
    this._financeService
      .createTaxCode(
        this.taxCode.taxCode,
        this.taxCode.taxCodeDescription,
        this.taxCode.taxCodePercentage
      )
      .subscribe({
        next: (taxCode) =>
          this._matDialog.open(ObjectCreatedComponent, {
            data: (this.objectCreated = taxCode.taxCode),
          }),
        error: (err) => {
          (this.errorMessage = err.error)
        },
        complete: () => console.info('Tax Code Created'),
      });
    this.formGroup.reset();
    this.formSubmitted = false;
  }

  public onEditTaxCode() {
    this._dialogRef.close(this.formGroup.value);
    this.taxCode = this.formGroup.value;
    this._financeService
      .editTaxCode(
        this.taxCodeData.id,
        this.taxCode.taxCodeDescription,
        this.taxCode.taxCodePercentage
      )
      .subscribe({
        next: (taxCodeEdited) =>
          this._matDialog.open(ChangesSavedDialogComponent, {
            data: (this.objectChanged = taxCodeEdited.taxCode),
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Tax Code Changed'),
      });
    this.formGroup.reset();
    this.formSubmitted = false;
  }

  public onDeleteTaxCode() {
    this._dialogRef.close(this.formGroup.value);
    this.taxCode = this.formGroup.value;
    this._financeService.deleteTaxCode(this.taxCodeData.id).subscribe({
      next: (taxCodeDeleted) => this._matDialog.open(DeleteDialogComponent, { data: this.taxCodeData.taxCodeDescription}),
      error: (err) => this.errorMessage = err,
      complete: () => console.info('Tax Code Deleted')
    });

  }
}
