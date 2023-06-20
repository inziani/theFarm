import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { FinanceService } from '@app/_helpers/services/finance.service';
import { UsersService } from '@app/_helpers/services/users.service';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.css'],
})
export class ProfileSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  public home!: string;
  public activity!: string;
  public activityCategory!: string;
  public bio!: string;
  public security!: string;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.closeSideNav.emit();
  }

  public onSelecthome() {
    this._userService.sendData(this.home);
  }

  public onLogOut() {
    this._authenticationService.onLogout();
    this._router.navigate(['/login']);
  }
}
