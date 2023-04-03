import { Component, Inject, inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectCreatedComponent } from '@app/core/dialogues/object-created/object-created.component';
import { FinanceService } from '@app/core/services/finance.service';
import { GLAccountGroup } from '@app/finance/finance-models/fi-data-models/organization-data-models';

import { GLAccountGroupMasterData } from '@app/finance/finance-models/fi-form-models/gl-master-data-model';

@Component({
  selector: 'app-account-group-dialog',
  templateUrl: './account-group-dialog.component.html',
  styleUrls: ['./account-group-dialog.component.css'],
})
export class AccountGroupDialogComponent {
  public selectedProcess!: string;
  public errorMessage!: string;
  public formGroup = new GLAccountGroupMasterData();
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
    this.accountGroup = accountGroupData;
    console.log('Dialog Data yaha! -', this.accountGroupData);
  }

  ngOnInit(): void {
    this._financeService.data.subscribe({
      next: (selectedProcess) => {
        (this.selectedProcess = selectedProcess);
      },
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });

    this.accountGroup = this.accountGroupData
    this.formGroup.patchValue(this.accountGroup);
    console.log('Dialog Data?? -', this.accountGroup);

  }


  public onCreateAccountGroup() {
    this._dialogRef.close(this.formGroup.value);
    this.accountGroup = this.formGroup.value;
    this._financeService.createGLAccountGroup(this.accountGroup);
    this._dialog.open(ObjectCreatedComponent, {
      data: (this.accountGroup.accountGroup = this.createdItem),
    });
    this.formGroup.reset();
    this.formSubmitted = false;
  }

  public onEditAccountGroup() {
    this._dialogRef.close(this.formGroup.value);
    this.accountGroup = this.formGroup.value;
  }

  public onDeleteAccountGroup() {}
}
