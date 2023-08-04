import { createReducer, on } from '@ngrx/store';

import { AuthenticationActions } from '../actions/authentication.actions';
import { AuthenticationState } from '../state/authentication.state';

const initialLoginState: AuthenticationState = {
  rememberMeCheckBox: false,
  maskUserEmail: true,
  jwtToken: { access: '', refresh: '' },
  isAuthenticated: false,
  error: '',
  isLoading: false,
};

export const authenticationReducer = createReducer<AuthenticationState>(
  initialLoginState,
  // on(AuthenticationActions['[Authentication]UserLogIn'], (state) => {
  //   return {
  //     ...state,
  //     isLoading: !state.isLoading,
  //   };
  // }),
  on(
    AuthenticationActions['[Authentication]UserLogInSucess'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        jwtToken: action.jwtToken,
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
