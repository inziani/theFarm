import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-finance-navbar',
  templateUrl: './finance-navbar.component.html',
  styleUrls: ['./finance-navbar.component.css'],
})
export class FinanceNavbarComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();

  ngOnInit(): void {}

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }

  onLogOut() {
    this._store.dispatch(
      AuthenticationActions['[Authentication]UserLogOutSucess']()
    );
    this._router.navigate(['/authentication/login']);
  }

  constructor(
    private _store: Store<AuthenticationState>,
    private _router: Router
  ) {}
}
