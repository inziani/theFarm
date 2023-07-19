import { Activity } from '@app/profile/todo/models/activity.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

//***********************************Activity********************************************************************************
export const ActivityActions = createActionGroup({
  source: 'Activity Page',
  events: {
    '[Activity] Set Current Activity ID': props<{ activityId: number }>(),
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

//***********************************End of Activity***********************************************************************
