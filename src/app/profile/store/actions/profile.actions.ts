import { Activity } from '@app/profile/todo/models/activity.model';
import { ActivityCategory } from '@app/profile/todo/models/activity-category.models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

//***********************************Activity********************************************************************************
export const ActivityActions = createActionGroup({
  source: 'Activity',
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

    //***************************Start of Edit Activity*****************************************************************
    '[Activity] Edit Activity': props<{ activity: Activity }>(),
    '[Activity] Edit Activity Success': props<{ activity: Activity }>(),
    '[Activity] Edit Activity Fail': props<{ error: string }>(),

    //***************************End of Edit Activity*******************************************************************
    //***********************************End of Activity****************************************************************
  },
});

export const ActivityCategoryActions = createActionGroup({
  source: 'Activity Category',
  events: {
    // **************************Fetch Activity Category List****************************************************************
    '[ActivityCategory] Retrieve Activity Category List': emptyProps(),
    '[ActivityCategory] Retrieve Activity Category List Success': props<{
      activityCategoryList: ActivityCategory[];
    }>(),
    '[ActivityCategory] Retrieve Activity Category List Failure': props<{
      errorMessage: string;
    }>(),
    // **************************End fetch of Activity Category List*********************************************************
  },
});
