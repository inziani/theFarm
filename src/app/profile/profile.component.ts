import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

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
    this._authenticationService.onLogout();
    this._router.navigate(['/authentication/login']);
  }
}
