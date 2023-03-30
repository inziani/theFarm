import { Component } from '@angular/core';
import { FinanceService } from '@app/core/services/finance.service';

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
  // public companyCodeList!: CompanyCodeMasterData[];
  // public controllingArea!: ControllingAreaMasterData;

  public createdItem!: string;
  public changedItem!: string;
  public deletedItem!: string;

  constructor(private _financeService: FinanceService) {}

  ngOnInit(): void {
    this._financeService.data.subscribe({
      next: (selectedProcess) => (this.selectedProcess = selectedProcess),
      error: (err) => (this.errorMessage = err),
      complete: () => console.info('Complete'),
    });
  }
}
