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
    private financeService: FinanceService
  ) { }

  ngOnInit(): void {
  }

  public onSelectCompany() {
    this.financeService.orgUnitSelected.emit(this.company);
  }

  public onSelectCompanyCode() {
    this.financeService.orgUnitSelected.emit(this.companyCode);
  }

  public onSelectChartOfAccounts() {
    this.financeService.orgUnitSelected.emit(this.chartOfAccounts);
  }

  public onSelectReportingArea() {
    this.financeService.orgUnitSelected.emit(this.reportingArea);
  }

  onSelectControllingArea() {
    this.financeService.orgUnitSelected.emit(this.controllingArea);
  }

  onSelectBusinessArea() {
    this.financeService.orgUnitSelected.emit(this.businessArea);
  }

  onSelectSalesArea() {
    this.financeService.orgUnitSelected.emit(this.salesArea);
  }

}
