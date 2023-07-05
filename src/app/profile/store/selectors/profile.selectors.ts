import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';


const getActivityFeatureState =
  createFeatureSelector<ActivityState>('activity');

export const getCurrentActivityId = createSelector(
  getActivityFeatureState,
  (state) => state.currentActivityId
);

export const getCurrentActivity = createSelector(
  getActivityFeatureState,
  getCurrentActivityId,
  (state, currentActivityId) => {
    if (currentActivityId === 0) {
      return {
        id: 0,
        title: 'string',
        description: 'string',
        status: 'string',
        activity_category: 0,
      };
    } else {
      return currentActivityId
        ? state.activityList.find((p) => p.id === currentActivityId)
        : null;
    }
  }
);

export const getActivityList = createSelector(
  getActivityFeatureState,
  (state) => state.activityList
);
export const getError = createSelector(
  getActivityFeatureState,
  (state) => state.error
);
