import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../_helpers/services/authentication.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  openPanel: boolean = false;

  ngOnInit(): void {}

  public onClose() {
    this.closeSideNav.emit();
  }

  public onLogOut() {
    this._store.dispatch(
      AuthenticationActions['[Authentication]UserLogOutSucess']()
    );
    this._router.navigate(['/authentication/login']);
  }

  constructor(
    private _router: Router,
    private _store: Store<AuthenticationState>
  ) {}
}
