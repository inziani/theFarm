import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from '../state/activity.state';
import * as ActivitiesSelectors from '../reducers/acivity.reducer';


export const selectActivityState =
  createFeatureSelector<ActivityState>('activity');

export const selectActivities = createSelector(
  selectActivityState,
  ActivitiesSelectors.selectActivities
);

export const selectActivitiesEntities = createSelector(
  selectActivityState,
  ActivitiesSelectors.selectActivityEntities
);

export const selectLoading = createSelector(
  selectActivityState,
  (activityState) => activityState.loading
);

export const selectActivityErrorMessage = createSelector(
  selectActivityState,
  (activityState) => activityState.errorMessage
);

export const selectActivityById = (id: number)=> createSelector(
  selectActivitiesEntities,
  activityEntities => activityEntities[id]
);
