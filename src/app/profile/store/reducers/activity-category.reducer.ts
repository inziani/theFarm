import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActivityCategoryState } from '../state/activity-category.state';
import {
  ActivityCategoryPageActions,
  ActivityCategoryAPIActions,
} from '../actions/activity-category.actions';
import { ActivityCategory } from '@app/profile/todo/models/activity-category.models';


export const activityCategoryAdapter: EntityAdapter<ActivityCategory> =
  createEntityAdapter<ActivityCategory>({
    selectId,
    // sortByTitle
  });

export function selectId(activityCategory: ActivityCategory): number {
  return activityCategory.id;
}

export function sortByTitle(a: ActivityCategory, b: ActivityCategory): string {
  return a.title.localeCompare(b.title).toString();
}

const { selectIds, selectAll, selectEntities, selectTotal } =
  activityCategoryAdapter.getSelectors();

export const selectCurrentActivityCategoryIds = selectIds;
export const selectActivityCategoryEntities = selectEntities;
export const selectActivityCategories = selectAll;
export const selectTotals = selectTotal;

export const initialState: ActivityCategoryState =
  activityCategoryAdapter.getInitialState({
    loading: false,
    errorMessage: '',
  });

export const activityCategoryReducer = createReducer<ActivityCategoryState>(
  initialState,

  on(
    ActivityCategoryPageActions['[ActivityCategoryPage]LoadActivityCategories'],

    (state) =>
      activityCategoryAdapter.setAll([], {
        ...state,
        loading: true,
        errorMessage: '',
      })
  ),
  on(
    ActivityCategoryAPIActions[
      '[ActivityCategoryAPI]LoadActivityCategoriesSuccess'
    ],
    (state, { activityCategories }) =>
      activityCategoryAdapter.setAll(activityCategories, {
        ...state,
        loading: false,
        error: '',
      })
  ),
  on(
    ActivityCategoryAPIActions[
      '[ActivityCategoryAPI]LoadActivityCategoriesFailure'
    ],
    (state, { errorMessage }) =>
      activityCategoryAdapter.setAll([], {
        ...state,
        loading: false,
        error: errorMessage,
      })
  ),

  on(
    ActivityCategoryPageActions['[ActivityCategoryPage]CreateActivityCategory'],
    (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(
    ActivityCategoryAPIActions[
      '[ActivityCategoryAPI]CreateActivityCategorySuccess'
    ],
    (state, { activityCategory }) =>
      activityCategoryAdapter.addOne(activityCategory, {
        ...state,
        loading: false,
        errorMessage: '',
      })
  ),
  on(
    ActivityCategoryAPIActions[
      '[ActivityCategoryAPI]CreateActivityCategoryFail'
    ],
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      errorMessage: errorMessage,
    })
  ),
  on(
    ActivityCategoryPageActions['[ActivityCategoryPage]EditActivityCategory'],
    (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(
    ActivityCategoryAPIActions[
      '[ActivityCategoryAPI]EditActivityCategorySuccess'
    ],
    (state, { activityCategory }) =>
      activityCategoryAdapter.updateOne(activityCategory, {
        ...state,
        loading: false,
        error: '',
      })
  ),
  on(
    ActivityCategoryAPIActions['[ActivityCategoryAPI]EditActivityCategoryFail'],
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      errorMessage: errorMessage,
    })
  ),
  on(
    ActivityCategoryPageActions['[ActivityCategoryPage]DeleteActivityCategory'],
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(
    ActivityCategoryAPIActions[
      '[ActivityCategoryAPI]DeleteActivityCategorySuccess'
    ],
    (state, { activityCategoryId }) =>
      activityCategoryAdapter.removeOne(activityCategoryId, {
        ...state,
        loading: false,
        errorMessage: '',
      })
  ),
  on(
    ActivityCategoryAPIActions[
      '[ActivityCategoryAPI]DeleteActivityCategoryFail'
    ],
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      errorMessage: errorMessage,
    })
  )
);
