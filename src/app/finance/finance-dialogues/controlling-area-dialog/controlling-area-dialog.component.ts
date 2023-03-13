import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChangesSavedDialogComponent } from '@app/core/dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { DeleteDialogComponent } from '@app/core/dialogues/delete-dialog/delete-dialog.component';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { ObjectCreatedComponent } from '@app/core/dialogues/object-created/object-created.component';

import { FinanceService } from '@app/core/services/finance.service';

import { CompanyCodeMasterDataModel, ControllingAreaMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { ControllingAreaMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-controlling-area-dialog',
  templateUrl: './controlling-area-dialog.component.html',
  styleUrls: ['./controlling-area-dialog.component.css'],
})
export class ControllingAreaDialogComponent implements OnInit {
  public selectedProcess!: string;
  public formGroup = new ControllingAreaMasterDataFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public companyCodeList!: CompanyCodeMasterDataModel[];
  public controllingArea!: ControllingAreaMasterDataModel;
  public errorMessage!: string;
  public createdItem!: string;
  public changedItem!: string;
  public deletedItem!: string;

  constructor(
    private financeService: FinanceService,
    private dialogRef: MatDialogRef<ControllingAreaDialogComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public controllingAreaDialogueData: ControllingAreaMasterDataModel
  ) {}

  ngOnInit(): void {
    this.getData();
    this.financeService.fetchCompanyCodeData().subscribe({
      next: (companyCodeData) => (this.companyCodeList = companyCodeData),
      error: (err) => this._dialog.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete'),
    });

    this.controllingArea = this.controllingAreaDialogueData;
    this.formGroup.patchValue(this.controllingArea);
  }

  public getData() {
    this.financeService.data.subscribe((process) => {
      this.selectedProcess = process;
    });
  }

  public onCreateControllingArea() {
    // Fetch data from the form and pass it on

    this.dialogRef.close(this.formGroup.value);
    this.controllingArea = this.formGroup.value;

    // Post the Data to the API

    this.financeService
      .createControllingAreaMasterData(
        this.controllingArea.companyCode,
        this.controllingArea.controllingAreaName,
        this.controllingArea.personReponsible,
        this.controllingArea.companyCode
      )
      .subscribe({
        // next: (controllingAreaMasterCreated) =>
        //   this.dialogue.open(ChangesSavedDialogComponent),
        next: (controllingAreaMasterCreated) =>
          this._dialog.open(ObjectCreatedComponent, {
            data: (this.createdItem =
              controllingAreaMasterCreated.controllingAreaName),
          }),

        error: (err) => this._dialog.open(ErrorHandlingDialogComponent),
        complete: () => console.info('Complete'),
      });
    this.formGroup.reset;
    this.formSubmitted = false;
  }

  public onEditControllingArea() {
    this.dialogRef.close(this.formGroup.value);
    this.controllingArea = this.formGroup.value;

    // Fetch Data from Form

    this.financeService
      .editSingleControllingAreaMasterData(
        this.controllingAreaDialogueData.id,
        this.controllingArea.controllingArea,
        this.controllingArea.controllingAreaName,
        this.controllingArea.personReponsible,
        this.controllingArea.companyCode
      )
      .subscribe({
        next: (controllingAreaMasterEdited) =>
          this._dialog.open(ChangesSavedDialogComponent),
        error: (err) => this._dialog.open(ErrorHandlingDialogComponent),
        complete: () => console.info('complete'),
      });
    this.formGroup.reset;
    this.formSubmitted = false;
  }

  public onDeleteControllingArea() {
    this.financeService
      .deleteControllingAreaMasterData(this.controllingArea.id)
      .subscribe({
        next: (controllingAreaDeleted) =>
          this._dialog.open(DeleteDialogComponent, {
            data: controllingAreaDeleted.controllingAreaName}),
        error: (err) =>
          this._dialog.open(ErrorHandlingDialogComponent, {
            data: (this.errorMessage = err),
          }),
        complete: () => console.info('complete'),
      });
  }

  public close() {
    this.dialogRef.close();
  }
}
