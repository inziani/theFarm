import { createReducer, on } from '@ngrx/store';
import { ActivityCategoryState } from '../state/activity-category.state';
import {
  ActivityCategoryPageActions,
  ActivityCategoryAPIActions,
} from '../actions/activity-category.actions';
import { activityCategoryAdapter } from '../adapters/activity-category.adapters';

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
      errorMessage: ''
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
