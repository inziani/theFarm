import { Activity } from '@app/profile/todo/models/activity.model';
import * as AppState from '@app/store/state/app.state';

export interface State extends AppState.State {
  activity: ActivityState;
}

export interface ActivityState {
  currentActivityId: number | null;
  activityList: Activity[];
  error: string;
}
