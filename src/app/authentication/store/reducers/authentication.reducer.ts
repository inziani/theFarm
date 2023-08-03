import { createReducer, on } from '@ngrx/store';

import { AuthenticationActions } from '../actions/authentication.actions';
import { AuthenticationState } from '../state/authentication.state';

const initialLoginState: AuthenticationState = {
  rememberMeCheckBox: false,
  maskUserEmail: true,
  jwtToken: { access: '', refresh: '' },
  isAuthenticated: false,
  error: '',
};

export const authenticationReducer = createReducer<AuthenticationState>(
  initialLoginState,
  on(
    AuthenticationActions['[Authentication]UserLogInSucess'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
        jwtToken: action.jwtToken,
        error: '',
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]UserLogInFail'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        error: action.errorMessage,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]RememberMeCheckBox'],
    (state): AuthenticationState => {
      return {
        ...state,
        rememberMeCheckBox: !state.rememberMeCheckBox,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]MaskUserEmail'],
    (state): AuthenticationState => {
      return {
        ...state,
        maskUserEmail: !state.maskUserEmail,
      };
    }
  )
);
