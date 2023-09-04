import { EntityState } from '@ngrx/entity';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';
import * as AppState from '@app/store/state/app.state';

export interface State extends AppState.State {
  activityCategory: ActivityCategoryState;
}

export interface ActivityCategoryState extends EntityState<ActivityCategory> {
  loading: boolean;
  errorMessage: string;
}
