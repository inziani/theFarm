import {
  Comparer,
  EntityAdapter,
  IdSelector,
  createEntityAdapter,
} from '@ngrx/entity';
import { ActivityCategory } from '@app/profile/user-activity/models/activity-category.models';

export const selectId: IdSelector<ActivityCategory> = ({ id }) => id;
export const sortByTitle: Comparer<ActivityCategory> = (s1, s2) =>
  s1.title.localeCompare(s2.title);
  
export const activityCategoryAdapter: EntityAdapter<ActivityCategory> =
  createEntityAdapter<ActivityCategory>({
    selectId: (activityCatagory: ActivityCategory) => activityCatagory.id,
    sortComparer: sortByTitle,
  });
