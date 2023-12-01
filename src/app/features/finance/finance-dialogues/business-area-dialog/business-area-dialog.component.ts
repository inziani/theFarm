import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ChangesSavedDialogComponent } from '@app/shared/user-feedback-dialogues/changes-saved-dialog/changes-saved-dialog.component';
import { DeleteDialogComponent } from '@app/shared/user-feedback-dialogues/delete-dialog/delete-dialog.component';

import { ObjectCreatedComponent } from '@app/shared/user-feedback-dialogues/object-created/object-created.component';
import { FinanceService } from '@app/_helpers/services/finance.service';
import {
  BusinessAreaMasterData,
  CompanyCodeMasterData,
} from '@app/features/finance/finance-models/fi-data-models/organization-data-models';
import { BusinessAreaMasterDataFormGroup } from '@app/features/finance/finance-models/fi-form-models/co-master-data-models';
import { ErrorsComponent } from '@app/errors/errors.component';

@Component({
  selector: 'app-business-area-dialog',
  templateUrl: './business-area-dialog.component.html',
  styleUrls: ['./business-area-dialog.component.css'],
})
export class BusinessAreaDialogComponent implements OnInit {
  public selectedProcess!: string;
  public formGroup = new BusinessAreaMasterDataFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public companyCodeList!: CompanyCodeMasterData[];
  public businessArea!: BusinessAreaMasterData;
  public errorMessage!: string;
  public createdItem!: string;
  public changedItem!: string;
  public deletedItem!: string;

  constructor(
    private financeService: FinanceService,
    private dialogRef: MatDialogRef<BusinessAreaDialogComponent>,
    private dialogue: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public businessAreaDialogueData: BusinessAreaMasterData
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.financeService.data.subscribe({
      next: (process) => (this.selectedProcess = process),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });

    this.financeService.fetchCompanyCodeData().subscribe({
      next: (companyCodeData) => (this.companyCodeList = companyCodeData),
      error: (err) =>
        this.dialogue.open(ErrorsComponent, {
          data: (this.errorMessage = err),
        }),
      complete: () => console.info('complete'),
    });

    this.businessArea = this.businessAreaDialogueData;
    this.formGroup.patchValue(this.businessArea);
  }

  public onCreateBusinessArea() {
    // Fetch data from the form and pass it on

    this.dialogRef.close(this.formGroup.value);
    this.businessArea = this.formGroup.value;

    // Post the Data to the API

    this.financeService
      .createBusinessAreaMasterData(
        this.businessArea.businessArea,
        this.businessArea.businessAreaName,
        this.businessArea.personResponsible,
        this.businessArea.companyCode
      )
      .subscribe({
        next: (businessAreaMasterCreated) =>
          this.dialogue.open(ObjectCreatedComponent, {
            data: (this.createdItem =
              businessAreaMasterCreated.businessAreaName),
          }),
        error: (err) =>
          this.dialogue.open(ErrorsComponent, {
            data: (this.errorMessage = err.message),
          }),
        complete: () => console.info('Complete'),
      });
    this.formGroup.reset;
    this.formSubmitted = false;
  }

  public onEditBusinessArea() {
    this.dialogRef.close(this.formGroup.value);
    this.businessArea = this.formGroup.value;

    // Fetch Data from Form

    this.financeService
      .editSingleBusinessAreaMasterData(
        this.businessAreaDialogueData.id,
        this.businessArea.businessArea,
        this.businessArea.businessAreaName,
        this.businessArea.personResponsible,
        this.businessArea.companyCode
      )
      .subscribe({
        next: (businessAreaMasterEdited) =>
          this.dialogue.open(ChangesSavedDialogComponent, {
            data: (this.changedItem =
              businessAreaMasterEdited.businessAreaName),
          }),
        error: (err) =>
          this.dialogue.open(ErrorsComponent, {
            data: (this.errorMessage = err),
          }),
        complete: () => console.info('Complete'),
      });
    this.formGroup.reset;
    this.formSubmitted = false;
  }

  public onDeleteBusinessArea() {
    this.financeService
      .deleteBusinessAreaMasterData(this.businessArea.id)
      .subscribe({
        next: (businessAreaDeleted) =>
          this.dialogue.open(DeleteDialogComponent, {
            data: (this.deletedItem = this.businessArea.businessAreaName),
          }),
        error: (err) =>
          this.dialogue.open(ErrorsComponent, {
            data: (this.errorMessage = err),
          }),
        complete: () => console.info('Complete'),
      });
  }
}
