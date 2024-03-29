import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileModuleState } from '../state/profile-module.state';
import { activityAdapter } from '../adapters/activity.adapter';

export const getProfileModuleStore =
  createFeatureSelector<ProfileModuleState>('profileModule');

export const selectActivityState = createSelector(
  getProfileModuleStore,
  (activity) => activity.activity
);

const {
  selectIds: selectIds,
  selectAll: selectAll,
  selectEntities: selectEntities,
  selectTotal: selectTotal,
} = activityAdapter.getSelectors();

export const selectAllActivities = createSelector(
  selectActivityState,
  selectAll
);
export const selectActivitiesEntities = createSelector(
  selectActivityState,
  selectEntities
);
export const selectActitityIds = createSelector(selectActivityState, selectIds);
export const selectActivityCount = createSelector(
  selectActivityState,
  selectTotal
);

export const selectLoading = createSelector(
  selectActivityState,
  (activityState) => activityState.loading
);

export const selectActivityErrorMessage = createSelector(
  selectActivityState,
  (activityState) => activityState.errorMessage
);

export const selectActivityById = (id: number) =>
  createSelector(
    selectActivitiesEntities,
    (activityEntities) => activityEntities[id]
  );
