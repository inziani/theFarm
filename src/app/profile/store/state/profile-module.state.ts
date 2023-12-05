import * as AppState from '@app/store/state/ui.state';
import * as ActivityState from './activity.state';
import * as ActivityCategoryState from './activity-category.state';

export interface State extends AppState.State {
  profileModuleState: ProfileModuleState;
}

export interface ProfileModuleState {
  activity: ActivityState.ActivityState;
  activityCategory: ActivityCategoryState.ActivityCategoryState;
}
