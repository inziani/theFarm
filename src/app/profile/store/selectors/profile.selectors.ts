import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';
// import { Activity } from '@app/profile/todo/models/activity.model';

const getActivityFeatureState =
  createFeatureSelector<ActivityState>('activity');


export const getActivity = createSelector(
  getActivityFeatureState,
  (state) => state.activityList
);


