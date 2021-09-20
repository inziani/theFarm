import { Component, OnInit } from '@angular/core';
import { RestDataSource } from '@app/shared/data/rest.datasource';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public date!: Date;
  
  

  constructor(
    private dataSource: RestDataSource
  ) { }

  ngOnInit(): void {
    this.date = this.dataSource.todaysDate
  }

}
