import { Activity } from '@app/profile/todo/models/activity.model';
import * as AppState from '@app/store/state/app.state';

export interface State extends AppState.State {
  profile: ActivityState;
}

export interface ActivityState {
  currentActivityId: null;
  activityList: Activity[];
  error: string;
  showActivity: boolean;
}
