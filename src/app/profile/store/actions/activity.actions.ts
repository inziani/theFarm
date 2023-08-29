import { Activity } from '@app/profile/todo/models/activity.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

//***********************************Activity********************************************************************************
export const ActivityPageActions = createActionGroup({
  source: 'Activity Page',
  events: {
    '[Activity] Load Activities': emptyProps(),
    '[Activity] Create Activity': props<{ activity: Activity }>(),
    '[Activity] Edit Activity': props<{ activity: Activity }>(),
    '[Activity] Delete Activity': props<{ activityId: number }>(),
  },
});

export const ActivityAPIActions = createActionGroup({
  source: 'Activity API',
  events: {
    '[ActivityAPI] Load Activites Success': props<{
      activityCategoryList: Activity[];
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
    '[ActivityAPI] Delete Activity Success': props<{ activityId: number }>(),
    '[ActivityAPI] Delete Activity Fail': props<{ error: string }>(),
  },
});
