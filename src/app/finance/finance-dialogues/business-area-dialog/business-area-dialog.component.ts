import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { BusinessAreaMasterDataModel, CompanyCodeMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { BusinessAreaMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-business-area-dialog',
  templateUrl: './business-area-dialog.component.html',
  styleUrls: ['./business-area-dialog.component.css']
})
export class BusinessAreaDialogComponent implements OnInit {

  public selectedProcess!: string;
  public formGroup = new BusinessAreaMasterDataFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public companyCodeList!: CompanyCodeMasterDataModel[];
  public businessArea!: BusinessAreaMasterDataModel;

  constructor(
    private financeService: FinanceService,
    private dialogRef: MatDialogRef<BusinessAreaDialogComponent>,
    private dialogue: MatDialog,
    @Inject(MAT_DIALOG_DATA) public businessAreaDialogueData: BusinessAreaMasterDataModel
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.financeService.data.subscribe(process => {
      this.selectedProcess = process;
    });

    this.financeService.fetchCompanyCodeData().subscribe({
      next: (companyCodeData) => this.companyCodeList = companyCodeData,
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete')
    });

    this.businessArea = this.businessAreaDialogueData;
    this.formGroup.patchValue(this.businessArea);
  }

  public onCreateBusinessArea() {

  }

  public onEditBusinessArea() {

  }

  public onDeleteBusinessArea() {

  }
}
