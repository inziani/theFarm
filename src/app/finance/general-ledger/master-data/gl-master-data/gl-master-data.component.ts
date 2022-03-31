import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { GLMasterDataFormGroup } from '@app/finance/finance-models/gl-models/gl-form-models/gl-master-data-model';
import { ProfitAndLossAccountType } from '@app/finance/finance-interfaces/pnl-account-interface';
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
