import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';
import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ActivityCategoryPageActions = createActionGroup({
  source: 'Activity Category Page',
  events: {
    '[ActivityCategoryPage] Load Activity Categories': emptyProps(),
    '[ActivityCategoryPage] Select Single Activity Category': props<{
      activityCategoryId: number;
    }>(),
    '[ActivityCategoryPage] Create Activity Category': props<{
      activityCategory: ActivityCategory;
    }>(),
    '[ActivityCategoryPage] Edit Activity Category': props<{
      activityCategory: ActivityCategory;
    }>(),
    '[ActivityCategoryPage] Delete Activity Category': props<{
      ActivityCategoryId: number;
    }>(),
  },
});

export const ActivityCategoryAPIActions = createActionGroup({
  source: 'Activity Category API',
  events: {
    '[ActivityCategoryAPI] Load Activity Categories Success': props<{
      activityCategories: ActivityCategory[];
    }>(),
    '[ActivityCategoryAPI] Load Activity Categories Failure': props<{
      errorMessage: string;
    }>(),
    '[ActivityCategoryAPI] Create Activity Category Success': props<{
      activityCategory: ActivityCategory;
    }>(),
    '[ActivityCategoryAPI] Create Activity Category Fail': props<{
      errorMessage: string;
    }>(),
    '[ActivityCategoryAPI] Edit Activity Category Success': props<{
      activityCategory: Update<ActivityCategory>;
    }>(),
    '[ActivityCategoryAPI] Edit Activity Category Fail': props<{
      errorMessage: string;
    }>(),
    '[ActivityCategoryAPI] Delete Activity Category Success': props<{
      activityCategoryId: number;
    }>(),
    '[ActivityCategoryAPI] Delete Activity Category Fail': props<{
      errorMessage: string;
    }>(),
  },
});
