import { createReducer, on } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';
import * as ActivityActions from '../actions/profile.actions';

const initialState: ActivityState = {
  currentActivityId: NaN,
  currentActivityCategoryId: NaN,
  activityList: [
    {
      id: 1,
      // slug: 1,
      title: 'JwT Authentication',
      description: 'Load and Refresh using JwT token Authentication',
      status: 'Work in progress',
      activity_category: 1,
    },
  ],
  activityCategoryList: [],
  error: '',
};

export const activityReducer = createReducer<ActivityState>(
  initialState,
  on(
    ActivityActions.ActivityActions['[Activity]SetCurrentActivityID'],
    (state, action): ActivityState => {
      return {
        ...state,
        currentActivityId: action.activityId,
      };
    }
  ),
  on(
    ActivityActions.ActivityActions['[Activity]ClearCurrentActivity]'],
    (state): ActivityState => {
      return {
        ...state,
        currentActivityId: null,
      };
    }
  ),
  on(
    ActivityActions.ActivityActions['[Activity]InitializeCurrentActivity]'],
    (state): ActivityState => {
      return {
        ...state,
        currentActivityId: 0,
      };
    }
  ),
  on(
    ActivityActions.ActivityActions['[Activity]RetrieveActivityList'],
    (state) => {
      return {
        ...state,
        activityList: state.activityList,
      };
    }
  ),
  on(
    ActivityActions.ActivityActions['[Activity]RetrieveActivityListSuccess'],
    (state, action): ActivityState => {
      return {
        ...state,
        activityList: action.activityList,
        error: '',
      };
    }
  ),
  on(
    ActivityActions.ActivityActions['[Activity]RetrieveActivityListFailure'],
    (state, action): ActivityState => {
      return {
        ...state,
        activityList: [],
        error: action.errorMessage,
      };
    }
  ),
  on(ActivityActions.ActivityActions['[Activity]CreateActivitySuccess'], (state, action) => {
    const updatedActivityList = state.activityList.map((item)=>
      action.activity.id === item.id ? action.activity : item);
    return {
      ...state,
      activityList: updatedActivityList,
      currentActivityId : action.activity.id,
      error: ''
    }
  }),
  on(ActivityActions.ActivityActions['[Activity]CreateActivityFail'], (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(
    ActivityActions.ActivityActions['[Activity]EditActivitySuccess'],
    (state, action) => {
      const updatedActivityList = state.activityList.map((item) =>
        action.activity.id === item.id ? action.activity : item
      );
      return {
        ...state,
        activityList: updatedActivityList,
        currentActivityId: action.activity.id,
        error: '',
      };
    }
  ),
  on(
    ActivityActions.ActivityActions['[Activity]EditActivityFail'],
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    ActivityActions.ActivityCategoryActions[
      '[ActivityCategory]RetrieveActivityCategoryList'
    ],
    (state) => {
      return {
        ...state,
        activityCategoryList: state.activityCategoryList,
      };
    }
  ),
  on(
    ActivityActions.ActivityCategoryActions[
      '[ActivityCategory]RetrieveActivityCategoryListSuccess'
    ],
    (state, action): ActivityState => {
      return {
        ...state,
        activityCategoryList: action.activityCategoryList,
        error: '',
      };
    }
  ),
  on(
    ActivityActions.ActivityCategoryActions[
      '[ActivityCategory]RetrieveActivityCategoryListFailure'
    ],
    (state, action): ActivityState => {
      return {
        ...state,
        activityCategoryList: [],
        error: action.errorMessage,
      };
    }
  )
);
