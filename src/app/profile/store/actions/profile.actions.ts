import { Activity } from '@app/profile/todo/models/activity.model';
import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';


export const ActivityActions = createActionGroup({
  source: 'Activity Page',
  events: {
    '[Activity] Retrieve Activity List': emptyProps(),
    '[Activity] Retrieved Activity List Success': props<{
      activityList: Activity[];
    }>(),
    '[Activity] Retrieve Activity List Failure': props<{
      errorMessage: string;
    }>(),
  },
});
