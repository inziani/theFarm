import { Component } from '@angular/core';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.css'],
})
export class GeneralLedgerComponent {
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
