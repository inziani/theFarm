import { Activity } from '@app/profile/todo/models/activity.model';
import { createAction, props } from '@ngrx/store';

export const loadActivities = createAction('[Activity] Load');
export const fetchActivityIdData = createAction('[Activity] Load Activity ID');
export const fetchActivityDataSuccess = createAction(
  '[Activity] Load Activity Data Success',
  props<{ activityList: Activity[] }>()
);
export const fetchActivityDataFailure = createAction(
  '[Activity] Load Activity List Failed',
  props<{ error: string }>()
);
export const showActivity = createAction('[Activity] Show Activity');
