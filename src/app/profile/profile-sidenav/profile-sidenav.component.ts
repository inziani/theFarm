import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@app/_helpers/services/users.service';
import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';
import { Store } from '@ngrx/store';

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
    this._store.dispatch(
      AuthenticationActions['[Authentication]UserLogOutSucess']()
    );
    this._router.navigate(['/authentication/login']);
  }

  constructor(
    private _store: Store<AuthenticationState>,
    private _router: Router,
    private _userService: UsersService
  ) {}
}
