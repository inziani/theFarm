import { Component } from '@angular/core';

@Component({
  selector: 'app-finance-landing-page',
  templateUrl: './finance-landing-page.component.html',
  styleUrls: ['./finance-landing-page.component.css'],
})
export class FinanceLandingPageComponent {
  public ReportSelected!: string;
  public OnSelectMasterData() {
    this.ReportSelected = 'masterData';
  }
  public OnSelectDocumentEntry() {
    this.ReportSelected = 'documentEntry';
  }
  public OnSelectGLGroupings() {
    this.ReportSelected = 'generalLedgerOrgStructures';
  }
  public OnSelectReports() {
    this.ReportSelected = 'generelLedgerReports';
  }
  public OnSelectFinanceOrgStructures() {
    this.ReportSelected = 'financeOrgStructures';
  }
}
