import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-home',
  templateUrl: './finance-home.component.html',
  styleUrls: ['./finance-home.component.css']
})
export class FinanceHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSelectCompany() {

    alert('The link works!')

  }

  onSelectCompanyCode() {

    alert('The link works!')

  }

  onSelectChartofAccounts() {

    alert('The link works!')

  }

  onSelectReportingArea() {

    alert('The link works!')

  }

  onSelectControllingArea() {

    alert('The link works!')

  }

  onSelectBusinessArea() {

    alert('The link works!')

  }

}
