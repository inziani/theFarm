import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestDataSource } from '@app/core/shared/data/rest.datasource';

@Component({
  selector: 'app-finance-navbar',
  templateUrl: './finance-navbar.component.html',
  styleUrls: ['./finance-navbar.component.css']
})
export class FinanceNavbarComponent implements OnInit {
   @Output() sideNavToggle = new EventEmitter<void>();

  constructor(
    private restDataSource: RestDataSource
  ) { }

  ngOnInit(): void {
  }

   onToggleSidenav() {

    this.sideNavToggle.emit();

   }


  onLogOut() {

    this.restDataSource.removeToken();

  }

}
