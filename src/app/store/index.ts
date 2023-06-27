import {
  // Action,
  ActionReducerMap,
  // createFeatureSelector,
  // createSelector,
} from '@ngrx/store';
import * as fromUIAuthenticationState from '../authentication/store/state/authentication.state';
import * as fromUIProfileState from '../profile/store/state/profile.state';

import * as fromAuthentication from '../authentication/store/reducers/authentication.reducer';
import * as fromProfile from '../profile/store/reducers/profile.reducer';

export interface UIState {
  authentication: fromUIAuthenticationState.AuthenticationLoginState;
  profile: fromUIProfileState.ActivityState;
}

export const reducers: ActionReducerMap<UIState> = {
  authentication: fromAuthentication.userLoginAuthenticationReducer,
  profile: fromProfile.activityReducer,
};

// export const getUiState = createFeatureSelector<fromUi.UIState>('ui');
// export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
