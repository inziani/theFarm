import { Activity } from '@app/profile/todo/models/activity.model';
import { createAction, props } from '@ngrx/store';

export const fetchActivityData = createAction('[Profile] Load Activity List');
export const fetchActivityDataSuccess = createAction(
  '[Profile] Load Activity Data Sucess',
  props<{ activity: Activity[] }>()
);
export const fetchActivityDataFailure = createAction(
  '[Profile] Load Activity List Failed',
  props<{ error: string }>()
);
