import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ActivityState } from '../state/activity.state';
import {
  ActivityPageActions,
  ActivityAPIActions,
} from '../actions/activity.actions';
import { Activity } from '@app/profile/todo/models/activity.model';

export const activityAdapter: EntityAdapter<Activity> =
  createEntityAdapter<Activity>({});

// const { selectIds, selectAll, selectEntities } = activityAdapter.getSelectors();

// export const selectCurrentActivityId = selectIds;
// export const selectActivityEntities = selectEntities;
// export const selectActivities = selectAll;

export const initialState: ActivityState = activityAdapter.getInitialState({
  // currentActivityCategoryId: NaN,
  loading: false,
  activities: [],
  activityId: NaN,
  error: '',
});

export const activityReducer = createReducer<ActivityState>(
  initialState,

  on(
    ActivityPageActions['[ActivityPage]LoadActivities'],

    (state) => activityAdapter.setAll([], { ...state })
  ),
  on(
    ActivityAPIActions['[ActivityAPI]LoadActivitesSuccess'],
    (state, { activityList }) =>
      activityAdapter.setAll(activityList, { ...state, error: '' })
  ),
  on(
    ActivityAPIActions['[ActivityAPI]LoadActivitiesFailure'],
    (state, { errorMessage }) =>
      activityAdapter.setAll([], { ...state, error: errorMessage })
  ),

  on(ActivityPageActions['[ActivityPage]CreateActivity'], (state) => ({
    ...state,
    error: '',
  })),
  on(
    ActivityAPIActions['[ActivityAPI]CreateActivitySuccess'],
    (state, { activity }) =>
      activityAdapter.addOne(activity, { ...state, error: '' })
  ),
  // on(
  //   ActivityActions.ActivityActions['[Activity]CreateActivitySuccess'],
  //   (state, action) => {
  //     const updatedActivityList = state.activityList.map((item) =>
  //       action.activity.id === item.id ? action.activity : item
  //     );
  //     return {
  //       ...state,
  //       activityList: updatedActivityList,
  //       currentActivityId: action.activity.id,
  //       error: '',
  //     };
  //   }
  // ),
  on(ActivityAPIActions['[ActivityAPI]CreateActivityFail'], (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(
    ActivityAPIActions['[ActivityAPI]EditActivitySuccess'],
    (state, { activityUpdate }) =>
      activityAdapter.updateOne(activityUpdate, { ...state, error: '' })
  ),
  on(ActivityAPIActions['[ActivityAPI]EditActivityFail'], (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
  // on(
  //   ActivityActions.ActivityCategoryActions[
  //     '[ActivityCategory]RetrieveActivityCategoryList'
  //   ],
  //   (state) => {
  //     return {
  //       ...state,
  //       activityCategoryList: state.activityCategoryList,
  //     };
  //   }
  // ),
  // on(
  //   ActivityActions.ActivityCategoryActions[
  //     '[ActivityCategory]RetrieveActivityCategoryListSuccess'
  //   ],
  //   (state, action): ActivityState => {
  //     return {
  //       ...state,
  //       activityCategoryList: action.activityCategoryList,
  //       error: '',
  //     };
  //   }
  // ),
  // on(
  //   ActivityActions.ActivityCategoryActions[
  //     '[ActivityCategory]RetrieveActivityCategoryListFailure'
  //   ],
  //   (state, action): ActivityState => {
  //     return {
  //       ...state,
  //       activityCategoryList: [],
  //       error: action.errorMessage,
  //     };
  //   }
  // )
);
