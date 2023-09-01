import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityCategoryState } from '../state/activity-category.state';
import * as ActivityCategorySelectors from '../reducers/activity-category.reducer';

export const selectActivityCategoryState =
  createFeatureSelector<ActivityCategoryState>('activityCategory');

export const selectActivityCategories = createSelector(
  selectActivityCategoryState,
  ActivityCategorySelectors.selectActivityCategories
);

export const selectActivityCategoryEntities = createSelector(
  selectActivityCategoryState,
  ActivityCategorySelectors.selectActivityCategoryEntities
);

export const selectLoading = createSelector(
  selectActivityCategoryState,
  (activityCategoryState) => activityCategoryState.loading
);

export const selectActivityErrorMessage = createSelector(
  selectActivityCategoryState,
  (activityCategoryState) => activityCategoryState.errorMessage
);

export const selectActivityCategoryById = (id: number) =>
  createSelector(
    selectActivityCategoryEntities,
    (activityCategoryEntities) => activityCategoryEntities[id]
  );
