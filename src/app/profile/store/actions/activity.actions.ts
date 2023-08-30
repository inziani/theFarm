import { Activity } from '@app/profile/todo/models/activity.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

//***********************************Activity********************************************************************************
export const ActivityPageActions = createActionGroup({
  source: 'Activity Page',
  events: {
    '[ActivityPage] Load Activities': emptyProps(),
    '[ActivityPage] Select Single Activity': props<{ activityId: number }>(),
    '[ActivityPage] Create Activity': props<{ activity: Activity }>(),
    '[ActivityPage] Edit Activity': props<{ activity: Activity }>(),
    '[ActivityPage] Delete Activity': props<{ activityId: number }>(),
  },
});

export const ActivityAPIActions = createActionGroup({
  source: 'Activity API',
  events: {
    '[ActivityAPI] Load Activites Success': props<{
      activityList: Activity[];
    }>(),
    '[ActivityAPI] Load Activities Failure': props<{
      errorMessage: string;
    }>(),
    '[ActivityAPI] Create Activity Success': props<{ activity: Activity }>(),
    '[ActivityAPI] Create Activity Fail': props<{ error: string }>(),
    '[ActivityAPI] Edit Activity Success': props<{
      activityUpdate: Update<Activity>;
    }>(),
    '[ActivityAPI] Edit Activity Fail': props<{ error: string }>(),
    '[ActivityAPI] Delete Activity Success': emptyProps(),
    '[ActivityAPI] Delete Activity Fail': props<{ error: string }>(),
  },
});
