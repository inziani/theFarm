import { Component, OnInit } from '@angular/core';
import { RestDataSource } from '@app/shared/data/rest.datasource';

@Component({
  selector: 'app-finance-footer',
  templateUrl: './finance-footer.component.html',
  styleUrls: ['./finance-footer.component.css'],
})
export class FinanceFooterComponent implements OnInit {
  public date!: Date;

  constructor(private dataSource: RestDataSource) {}

  ngOnInit(): void {
    this.date = this.dataSource.todaysDate;
  }
}
