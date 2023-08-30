import { ActivityCategory } from '@app/profile/todo/models/activity-category.models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ActivityCategoryPageActions = createActionGroup({
  source: 'Activity Category Page',
  events: {
    '[ActivityCategory] Load Activity Categories': emptyProps(),
  },
});

export const ActivityCategoryAPIActions = createActionGroup({
  source: 'Activity Category API',
  events: {
    '[ActivityCategoryAPI] Load Activity Categories Success': props<{
      activityCategoryList: ActivityCategory[];
    }>(),
    '[ActivityCategoryAPI] Load Activity Categories Failure': props<{
      errorMessage: string;
    }>(),
  },
});
