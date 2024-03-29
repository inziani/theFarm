import { EntityState } from '@ngrx/entity';
import { Activity } from '@app/profile/user-activity/models/activity.model';
import * as AppState from '@app/store/state/ui.state';

export interface State extends AppState.State {
  activity: ActivityState;
}

export interface ActivityState extends EntityState<Activity> {
  loading: boolean;
  errorMessage: string;
}
