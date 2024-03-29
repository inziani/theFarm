import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivityCategoryState } from './store/state/activity-category.state';
import { ActivityCategoryPageActions } from './store/actions/activity-category.actions';
import { ActivityPageActions } from './store/actions/activity.actions';
import { AuthenticationActions } from '@app/authentication/store/actions/authentication.actions';

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
    this._store.dispatch(ActivityPageActions['[ActivityPage]LoadActivities']());

  }
  public onSelectActivityCategory() {
    this.itemSelected = 'activityCategory';
    this._store.dispatch(
      ActivityCategoryPageActions[
        '[ActivityCategoryPage]LoadActivityCategories'
      ]()
    );
  }
  public onSelectBio() {
    this.itemSelected = 'bio';
  }
  public onSelectSecurity() {
    this.itemSelected = 'security';
  }
  public onLogOut() {
    this._store.dispatch(
      AuthenticationActions['[Authentication]UserLogOutSucess']()
    );
    this._router.navigate(['/authentication/login']);
  }

  constructor(
    private _router: Router,
    private _store: Store<ActivityCategoryState>
  ) {}
}
