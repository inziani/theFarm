import { createReducer, on } from '@ngrx/store';

import * as AuthenticationActions from '../actions/authentication.actions';
import { AuthenticationLoginState } from '../state/authentication.state';

const initialLoginState: AuthenticationLoginState = {
  login: {
    userEmail: '',
    isAuthenticated: false,
  },
  rememberMeCheckBox: false,
};

export const userLoginAuthenticationReducer =
  createReducer<AuthenticationLoginState>(
    initialLoginState,
    on(
      AuthenticationActions.logIn,
      (state, action): AuthenticationLoginState => {
        console.log('Original Login State');
        return {
          ...state,
          login: action.userDetails,
        };
      }
    ),
    on(
      AuthenticationActions.rememberMeCheckBox,
      (state): AuthenticationLoginState => {
        console.log('Remember me Checkbox');
        return {
          ...state,
          rememberMeCheckBox: !state.rememberMeCheckBox,
        };
      }
    )
  );
