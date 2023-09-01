import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ActivityState } from '../state/activity.state';
import {
  ActivityPageActions,
  ActivityAPIActions,
} from '../actions/activity.actions';
import { Activity } from '@app/profile/todo/models/activity.model';

export const activityAdapter: EntityAdapter<Activity> =
  createEntityAdapter<Activity>({
    selectId,
    // sortByTitle
  });

export function selectId(activity: Activity): number {
  return activity.id;
}

export function sortByTitle(a: Activity, b: Activity): string {
  return a.title.localeCompare(b.title).toString();
}

const { selectIds, selectAll, selectEntities,selectTotal } = activityAdapter.getSelectors();

export const selectCurrentActivityId = selectIds;
export const selectActivityEntities = selectEntities;
export const selectActivities = selectAll;

export const initialState: ActivityState = activityAdapter.getInitialState({
  loading: false,
  errorMessage: '',
});

export const activityReducer = createReducer<ActivityState>(
  initialState,

  on(
    ActivityPageActions['[ActivityPage]LoadActivities'],

    (state) =>
      activityAdapter.setAll([], { ...state, loading: true, errorMessage: '' })
  ),
  on(
    ActivityAPIActions['[ActivityAPI]LoadActivitesSuccess'],
    (state, { activities }) =>
      activityAdapter.setAll(activities, {
        ...state,
        loading: false,
        error: '',
      })
  ),
  on(
    ActivityAPIActions['[ActivityAPI]LoadActivitiesFailure'],
    (state, { errorMessage }) =>
      activityAdapter.setAll([], {
        ...state,
        loading: false,
        error: errorMessage,
      })
  ),

  on(ActivityPageActions['[ActivityPage]CreateActivity'], (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(
    ActivityAPIActions['[ActivityAPI]CreateActivitySuccess'],
    (state, { activity }) =>
      activityAdapter.addOne(activity, {
        ...state,
        loading: false,
        errorMessage: '',
      })
  ),
  on(
    ActivityAPIActions['[ActivityAPI]CreateActivityFail'],
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      errorMessage: errorMessage,
    })
  ),
  on(ActivityPageActions['[ActivityPage]EditActivity'], (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(
    ActivityAPIActions['[ActivityAPI]EditActivitySuccess'],
    (state, { activity }) =>
      activityAdapter.updateOne(activity, {
        ...state,
        loading: false,
        error: '',
      })
  ),
  on(
    ActivityAPIActions['[ActivityAPI]EditActivityFail'],
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      errorMessage: errorMessage,
    })
  ),
  on(ActivityPageActions['[ActivityPage]DeleteActivity'], (state) => ({
    ...state,
    loading: true,
  })),
  on(
    ActivityAPIActions['[ActivityAPI]DeleteActivitySuccess'],
    (state, { activityId }) =>
      activityAdapter.removeOne(activityId, {
        ...state,
        loading: false,
        errorMessage: '',
      })
  ),
  on(
    ActivityAPIActions['[ActivityAPI]DeleteActivityFail'],
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      errorMessage: errorMessage,
    })
  )
);
