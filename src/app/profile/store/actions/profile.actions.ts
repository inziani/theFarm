import { Activity } from '@app/profile/todo/models/activity.model';
import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ActivityState } from '../state/profile.state';

export const ActivityActions = createActionGroup({
  source: 'Activity Page',
  events: {
    '[Activity] Set Current Activity': props<{ activityId: number }>(),
    '[Activity] Clear Current Activity]': emptyProps(),
    '[Activity] Initialize Current Activity]': emptyProps(),
    '[Activity] Retrieve Activity List': emptyProps(),
    '[Activity] Retrieve Activity List Success': props<{
      activityList: Activity[];
    }>(),
    '[Activity] Retrieve Activity List Failure': props<{
      errorMessage: string;
    }>(),
  },
});

//  Edit Activity
