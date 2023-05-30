import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthenticationService } from '@app/core/services/authentication.service';



@Component({
  selector: 'app-finance-navbar',
  templateUrl: './finance-navbar.component.html',
  styleUrls: ['./finance-navbar.component.css']
})
export class FinanceNavbarComponent implements OnInit {
   @Output() sideNavToggle = new EventEmitter<void>();

  constructor(
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

   onToggleSidenav() {

    this.sideNavToggle.emit();

   }

  onLogOut() {

   this._authenticationService.onLogout();

  }

}
