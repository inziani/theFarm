import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileModuleState } from '../state/profile-module.state';
import { activityCategoryAdapter } from '../adapters/activity-category.adapters';

const {
  selectIds: selectIds,
  selectAll: selectAll,
  selectEntities: selectEntities,
  selectTotal: selectTotal,
} = activityCategoryAdapter.getSelectors();

export const selectActivityCategoryState =
  createFeatureSelector<ProfileModuleState['activityCategory']>(
    'activityCategory'
  );

export const selectAllActivityCategories = createSelector(
  selectActivityCategoryState,
  selectAll
);
export const selectActivityCategoryEntities = createSelector(
  selectActivityCategoryState,
  selectEntities
);
export const selectActivityCategoryIds = createSelector(
  selectActivityCategoryState,
  selectIds
);
export const selectActivityCategoryCount = createSelector(
  selectActivityCategoryState,
  selectTotal
);

export const selectLoading = createSelector(
  selectActivityCategoryState,
  (selectActivityCategoryState) => selectActivityCategoryState.loading
);

export const selectActivityCategoryErrorMessage = createSelector(
  selectActivityCategoryState,
  (selectActivityCategoryState) => selectActivityCategoryState.errorMessage
);

export const selectActivityCategoryById = (id: number) =>
  createSelector(
    selectActivityCategoryEntities,
    (activityCategoryEntities) => activityCategoryEntities[id]
  );
