import { Component, OnInit } from '@angular/core';

import { GLMasterDataFormGroup } from '@app/finance/finance-models/fi-form-models/gl-master-data-model';
import { ProfitAndLossAccountType } from '@app/finance/finance-interfaces/pnl-account-interface';

@Component({
  selector: 'app-gl-header-master',
  templateUrl: './gl-header-master.component.html',
  styleUrls: ['./gl-header-master.component.css']
})
export class GlHeaderMasterComponent implements OnInit {

  public isLoading: boolean = false;
  public maxDate!: Date;
  public formSubmitted: boolean = false;
  public formGroup = new GLMasterDataFormGroup();
  public pnlAccountType!: ProfitAndLossAccountType [];


  constructor() {

    this.pnlAccountType = [
      { value: 'Revenue', viewValue: 'Revenue' },
      { value: 'Expense', viewValue: 'Expense' }

    ]
  }

  ngOnInit(): void {

  }

  submitForm() {

  }

}
