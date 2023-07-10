import { createReducer, on } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';
import * as ActivityActions from '../actions/profile.actions';

const initialState: ActivityState = {
  currentActivityId: NaN,
  activityList: [
    {
      id: 1,
      title: 'JwT Authentication',
      description: 'Load and Refresh using JwT token Authentication',
      status: 'Work in progress',
      activity_category: 1,
    },
  ],
  error: '',
};

export const activityReducer = createReducer<ActivityState>(
  initialState,
  on(
    ActivityActions.ActivityActions['[Activity]SetCurrentActivity'],
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
        isLoading: true,
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
  )
);
