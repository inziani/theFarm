import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingDialogComponent } from '@app/core/dialogues/error-handling-dialog/error-handling-dialog.component';
import { FinanceService } from '@app/core/services/finance.service';
import { CompanyCodeMasterDataModel, ControllingAreaMasterDataModel } from '@app/finance/finance-models/fi-data-models/organization-data-models';
import { ControllingAreaMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/co-master-data-models';

@Component({
  selector: 'app-controlling-area-dialog',
  templateUrl: './controlling-area-dialog.component.html',
  styleUrls: ['./controlling-area-dialog.component.css']
})
export class ControllingAreaDialogComponent implements OnInit {

  public selectedProcess!: string;
  public formGroup = new ControllingAreaMasterDataFormGroup();
  public isLoading: boolean = false;
  public readonly!: boolean;
  public formSubmitted: boolean = false;
  public companyCodeList!: CompanyCodeMasterDataModel[];
  public controllingArea!: ControllingAreaMasterDataModel;




  constructor(

    private financeService: FinanceService,
    private dialogRef: MatDialogRef<ControllingAreaDialogComponent>,
    private dialogue: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData();
    this.financeService.fetchCompanyCodeData().subscribe({
      next: (companyCodeData) => this.companyCodeList = companyCodeData,
      error: (err) => this.dialogue.open(ErrorHandlingDialogComponent),
      complete: () => console.info('complete')
    });
  }

  public getData() {
    this.financeService.data.subscribe(process => {
      this.selectedProcess = process;

    });
  }

  public onCreateControllingArea() {

  }

  public onEditControllingArea() {

  }


  public onDeleteControllingArea() {


  }

  public close() {

    this.dialogRef.close();
  }

}
