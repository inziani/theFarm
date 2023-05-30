import { Component, OnInit } from '@angular/core';
import { FinanceService } from '@app/core/services/finance.service';


@Component({
  selector: 'app-org-unit-list',
  templateUrl: './org-unit-list.component.html',
  styleUrls: ['./org-unit-list.component.css']
})
export class OrgUnitListComponent implements OnInit {
  public company: string = 'company';
  public companyCode: string = 'companyCode';
  public chartOfAccounts: string = 'chartOfAccounts';
  public reportingArea: string = 'reportingArea';
  public controllingArea: string = 'controllingArea';
  public businessArea: string = 'businessArea';
  public salesArea: string = 'salesArea';

  constructor(
    private _financeService: FinanceService
  ) { }

  ngOnInit(): void {
  }

  public onSelectCompany() {
    this._financeService.itemSelected.emit(this.company);
  }

  public onSelectCompanyCode() {
    this._financeService.itemSelected.emit(this.companyCode);
  }

  public onSelectChartOfAccounts() {
    this._financeService.itemSelected.emit(this.chartOfAccounts);
  }

  public onSelectReportingArea() {
    this._financeService.itemSelected.emit(this.reportingArea);
  }

  onSelectControllingArea() {
    this._financeService.itemSelected.emit(this.controllingArea);
  }

  onSelectBusinessArea() {
    this._financeService.itemSelected.emit(this.businessArea);
  }

  onSelectSalesArea() {
    this._financeService.itemSelected.emit(this.salesArea);
  }

}
