import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
// import { RestDataSource } from '@app/shared/data/rest.datasource';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.css'],
})
export class ProfileSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  constructor(
    // private restDataSource: RestDataSource
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.closeSideNav.emit();
  }

  onLogOut() {
    this._authenticationService.onLogout();
    // this.restDataSource.removeToken();
  }
}
