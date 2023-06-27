import { createReducer, on } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';
import * as ActivityActions from '../actions/profile.actions';

const initialState: ActivityState = {
  activityList: [],
  currentActivity: {
    id: NaN,
    title: '',
    description: '',
    status: '',
    activity_category: NaN,
  },
  deleteActivityID: NaN,
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
};

export const activityReducer = createReducer<ActivityState>(
  initialState,
  on(
    ActivityActions.ActivityActions['[Activity]RetrieveActivityList'],
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    ActivityActions.ActivityActions['[Activity]RetrievedActivityListSuccess'],
    (state, action): ActivityState => {
      return {
        ...state,
        activityList: action.activityList,
        isLoading: false,
        isLoadingSuccess: true,
      };
    }
  )
);
