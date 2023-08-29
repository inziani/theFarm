import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ActivityState } from '../state/profile.state';
import { ActivityActions } from '../actions/activity.actions';
import { Activity } from '@app/profile/todo/models/activity.model';

export const activityAdapter: EntityAdapter<Activity> =
  createEntityAdapter<Activity>({});

const { selectIds, selectAll, selectEntities } = activityAdapter.getSelectors();

export const selectCurrentActivityId = selectIds;
export const selectActivityEntities = selectEntities;
export const selectActivities = selectAll;

export const initialState: ActivityState = activityAdapter.getInitialState({
  // currentActivityId: NaN,
  // currentActivityCategoryId: NaN,
  // activityList: [
  //   {
  //     id: 1,

  //     title: 'JwT Authentication',
  //     description: 'Load and Refresh using JwT token Authentication',
  //     status: 'Work in progress',
  //     activity_category: 1,
  //   },
  // ],
  // activityCategoryList: [],
  error: '',
});

export const activityReducer = createReducer<ActivityState>(
  initialState,
  // on(
  //   ActivityActions.ActivityActions['[Activity]SetCurrentActivityID'],
  //   (state, action): ActivityState => {
  //     return {
  //       ...state,
  //       currentActivityId: action.activityId,
  //     };
  //   }
  // ),
  // on(
  //   ActivityActions.ActivityActions['[Activity]ClearCurrentActivity]'],
  //   (state): ActivityState => {
  //     return {
  //       ...state,
  //       currentActivityId: null,
  //     };
  //   }
  // ),
  // on(
  //   ActivityActions.ActivityActions['[Activity]InitializeCurrentActivity]'],
  //   (state): ActivityState => {
  //     return {
  //       ...state,
  //       currentActivityId: 0,
  //     };
  //   }
  // ),
  on(
    ActivityActions['[Activity]RetrieveActivityList'],

    (state) => activityAdapter.setAll([], { ...state })
  ),
  on(
    ActivityActions['[Activity]RetrieveActivityListSuccess'],
    (state, { activityList }) =>
      activityAdapter.setAll(activityList, { ...state, error: '' })
  ),
  on(
    ActivityActions['[Activity]RetrieveActivityListFailure'],
    (state, { errorMessage }) =>
      activityAdapter.setAll([], { ...state, error: errorMessage })
  ),

  on(ActivityActions['[Activity]CreateActivity'], (state) => ({
    ...state,
    error: '',
  })),
  on(
    ActivityActions['[Activity]CreateActivitySuccess'],
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
  on(ActivityActions['[Activity]CreateActivityFail'], (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(
    ActivityActions['[Activity]EditActivitySuccess'],
    (state, { activityUpdate }) =>
      activityAdapter.updateOne(activityUpdate, { ...state, error: '' })
  ),
  on(ActivityActions['[Activity]EditActivityFail'], (state, action) => {
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
