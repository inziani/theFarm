import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '@app/authentication/store/state/authentication.state';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public itemSelected!: string;
  public isLoading: boolean = false;
  public readonly!: boolean;
  public isDisabled!: boolean;
  public errorMessage!: string;

  ngOnInit(): void {}

  ngOnDestroy() {}

  public onSelectActivity() {
    this.itemSelected = 'activity';
  }
  public onSelectActivityCategory() {
    this.itemSelected = 'activityCategory';
  }
  public onSelectBio() {
    this.itemSelected = 'bio';
  }
  public onSelectSecurity() {
    this.itemSelected = 'security';
  }
  public onLogOut() {
    // this._store.dispatch(
    //   AuthenticationActions['[Authentication]UserLogOutSucess']()
    // );
    this._router.navigate(['/authentication/login']);
  }

  constructor(
    private _router: Router,
    private _store: Store<AuthenticationState>
  ) {}
}
