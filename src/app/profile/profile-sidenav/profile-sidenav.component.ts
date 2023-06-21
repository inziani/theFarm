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

  public home: string = 'home';
  public activity: string = 'activity';
  public activityCategory: string = 'activityCategory';
  public bio: string = 'bio';
  public security: string = 'security';

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.closeSideNav.emit();
  }

  public onSelectActivity() {
    this._userService.sendData(this.activity);
  }
  public onSelectActivityCategory() {
    this._userService.sendData(this.activityCategory);
  }
  public onSelectBio() {
    this._userService.sendData(this.bio);
  }
  public onSelectSecurity() {
    this._userService.sendData(this.security);
  }
  public onLogOut() {
    this._authenticationService.onLogout();
    this._router.navigate(['/login']);
  }
}
