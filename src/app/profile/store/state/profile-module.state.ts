
import { ActivityCategoryState } from './activity-category.state';
import * as AppState from '@app/store/state/app.state';
import { ActivityState } from './activity.state';

export interface State extends AppState.State {
  profileModuleState: ProfileModuleState
}

export interface ProfileModuleState {
  activity: ActivityState,
  activityCategory: ActivityCategoryState
}


