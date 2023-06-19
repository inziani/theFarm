import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';

const getActivityFeatureState =
  createFeatureSelector<ActivityState>('activity');

export const getCurrentActivityId = createSelector(
  getActivityFeatureState,
  (state) => state.currentActivityId
);
export const getActivityList = createSelector(
  getActivityFeatureState,
  (state) => state.activityList
);
export const getError = createSelector(
  getActivityFeatureState,
  (state) => state.error
);
export const getShowActivity = createSelector(
  getActivityFeatureState,
  (state) => state.showActivity
);
