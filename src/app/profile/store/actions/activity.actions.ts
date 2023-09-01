import { Activity } from '@app/profile/todo/models/activity.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


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
      activities: Activity[];
    }>(),
    '[ActivityAPI] Load Activities Failure': props<{
      errorMessage: string;
    }>(),
    '[ActivityAPI] Create Activity Success': props<{ activity: Activity }>(),
    '[ActivityAPI] Create Activity Fail': props<{ errorMessage: string }>(),
    '[ActivityAPI] Edit Activity Success': props<{
      activity: Update<Activity>;
    }>(),
    '[ActivityAPI] Edit Activity Fail': props<{ errorMessage: string }>(),
    '[ActivityAPI] Delete Activity Success':emptyProps(),
    '[ActivityAPI] Delete Activity Fail': props<{ errorMessage: string }>(),
  },
});
