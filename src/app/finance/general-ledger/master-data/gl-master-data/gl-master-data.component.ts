import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { GLMasterDataFormGroup } from '@app/finance/finance-models/gl-form-models/gl-master-data-model';
import { ProfitAndLossAccountType } from '@app/finance/finance-interfaces/pnl-account-interface';
import { ReconciliationAccountType } from '@app/finance/finance-interfaces/finance-interfaces';
import { SearchDialogComponent } from '@app/finance/finance-dialogues/search-dialog/search-dialog.component';
import { GlMasterDataModel } from '@app/finance/finance-models/fi-data-models/gl-account-master-model';


@Component({
  selector: 'app-gl-master-data',
  templateUrl: './gl-master-data.component.html',
  styleUrls: ['./gl-master-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GlMasterDataComponent implements OnInit {

  public isLoading: boolean = false;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public formGroup = new GLMasterDataFormGroup();
  public pnlAccountType!: ProfitAndLossAccountType[];
  public reconciliationAcctType!: ReconciliationAccountType[];
  public glAccount!: GlMasterDataModel;
  public readonly!: boolean;

  constructor(
    public dialog: MatDialog
  ) {

     this.pnlAccountType = [
      { value: 'Revenue', viewValue: 'Revenue' },
      { value: 'Expense', viewValue: 'Expense' }
     ]

    this.reconciliationAcctType = [
      { value: 'Assets', viewValue: 'Assets' },
      { value: 'Accounts Payable', viewValue: 'Accounts Payable' },
      { value: 'Accounts Receivable', viewValue: 'Accounts Receivable' },
      { value: 'Petty Cash', viewValue: 'Petty Cash' },
      { value: 'Banks', viewValue: 'Banks' },
      { value: 'Materials Management', viewValue: 'Materials Management' },

    ]
  }

  ngOnInit(): void {
    this.readonly = true;
  }

  onSave() {
    if (this.formGroup.valid) {
      return;
    }
    this.glAccount = this.formGroup.value;
    this.formSubmitted = true;
    console.log('Test Form items-', this.glAccount, this.glAccount.accountNumber);

  }

  onSearchGLAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '150px'
    const dialogRef = this.dialog.open(SearchDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(success => {
      // alert(success);
    });
    // alert('Open Search Dialogue')
  }

  onCreateGLAccount() {
    this.readonly = !this.readonly;
    console.log(this.readonly);

}
};


