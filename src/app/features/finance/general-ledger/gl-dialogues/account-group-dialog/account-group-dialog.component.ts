import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { DeleteDialogComponent } from '@app/shared/user-feedback-dialogues/delete-dialog/delete-dialog.component';
import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { GLAccountGroup } from '@app/features/finance/finance-models/fi-data-models/organization-data-models';

import { GLMasterDataAccountGroupFormGroup } from '@app/features/finance/finance-models/fi-form-models/gl-master-data-model';

@Component({
  selector: 'app-account-group-dialog',
  templateUrl: './account-group-dialog.component.html',
  styleUrls: ['./account-group-dialog.component.css'],
})
export class AccountGroupDialogComponent {
  public selectedProcess!: string;
  public errorMessage!: string;
  public formGroup = new GLMasterDataAccountGroupFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public accountGroup!: GLAccountGroup;

  public createdItem!: string;
  public changedItem!: string;
  public deletedItem!: string;

  constructor(
    private _financeService: FinanceService,
    private _dialogRef: MatDialogRef<AccountGroupDialogComponent>,
    private readonly _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public accountGroupData: GLAccountGroup
  ) {
    this.accountGroup = this.accountGroupData;
  }

  ngOnInit(): void {
    this.readonly = !this.readonly;
    this._financeService.data.subscribe({
      next: (selectedProcess) => {
        this.selectedProcess = selectedProcess;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });

    this.formGroup.patchValue(this.accountGroupData);
  }

  public onCreateAccountGroup() {
    this._dialogRef.close(this.formGroup.value);
    this.accountGroup = this.formGroup.value;
    this._financeService
      .createGLAccountGroup(
        this.accountGroup.accountGroup,
        this.accountGroup.description
      )
      .subscribe({
        next: (accountGroupCreated) =>
          this._dialog.open(ObjectCreatedComponent, {
            data: (this.createdItem = accountGroupCreated.accountGroup),
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Complete'),
      });

    this.formGroup.reset();
    this.formSubmitted = false;
  }

  public onEditAccountGroup() {
    this._dialogRef.close(this.formGroup.value);
    this.accountGroup = this.formGroup.value;
    this._financeService
      .editSingleGLAccountGroup(
        this.accountGroupData.id,
        this.accountGroup.accountGroup,
        this.accountGroup.description
      )
      .subscribe({
        next: (accountGroupEdited) =>
          this._dialog.open(ChangesSavedDialogComponent, {
            data: (this.changedItem = accountGroupEdited.accountGroup),
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Complete'),
      });
  }

  public onDeleteAccountGroup() {
    this._financeService
      .deleteAccountGroup(this.accountGroupData.id)
      .subscribe({
        next: (deleted) =>
          this._dialog.open(DeleteDialogComponent, {
            data: this.accountGroup.accountGroup,
          }),
        error: (err) => (this.errorMessage = err),
        complete: () => console.info('Complete'),
      });
  }
}
