import { createReducer, on } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';
import * as ActivityActions from '../actions/profile.actions';

const initialState: ActivityState = {
  currentActivityId: null,
  activityList: [],
  error: '',
  showActivity: false,
};

export const reducer = createReducer<ActivityState>(
  initialState,
  on(ActivityActions.fetchActivityIdData, (state) => {
    return {
      ...state,
      currentActivityId: state.currentActivityId,
    };
  }),
  on(
    ActivityActions.fetchActivityDataSuccess,
    (state, action): ActivityState => {
      return {
        ...state,
        activityList: action.activity,
      };
    }
  ),
  on(ActivityActions.fetchActivityDataFailure, (state) => {
    return {
      ...state,
      error: state.error,
    };
  }),
  on(ActivityActions.showActivity, (state) => {
    return {
      ...state,
      showActivity: state.showActivity,
    };
  })
);
