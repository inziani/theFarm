import {
  Comparer,
  EntityAdapter,
  IdSelector,
  createEntityAdapter,
} from '@ngrx/entity';
import { Activity } from '../../user-activity/models/activity.model';

export const selectId: IdSelector<Activity> = ({ id }) => id;
export const sortByTitle: Comparer<Activity> = (s1, s2) =>
  s1.title.localeCompare(s2.title);
export const activityAdapter: EntityAdapter<Activity> =
  createEntityAdapter<Activity>({
    selectId,
    sortComparer: sortByTitle,
  });
