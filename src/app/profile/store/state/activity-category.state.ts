import { EntityState } from '@ngrx/entity';
import { ActivityCategory } from '@app/profile/todo/models/activity-category.models';
// import { Activity } from '@app/profile/todo/models/activity.model';
import * as AppState from '@app/store/state/app.state';

export interface State extends AppState.State {
  activityCategory: ActivityCategoryState;
}

export interface ActivityCategoryState extends EntityState<ActivityCategory> {
  // currentActivityId: number | null;
  // currentActivityCategoryId: number | null;
  // activityList: Activity[];
  // activityCategoryList: ActivityCategory[];
  error: string;
}
