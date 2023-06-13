import { createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from '../actions/authentication.actions';

export interface AuthenticationLoginState {
  rememberMeCheckBox: boolean;
  login: {
    userEmail: string;
    isAuthenticated: boolean;
  };
}

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

// export const authenticationReducer = createReducer<AuthenticationState>(
//   initialState,
//   on(AuthenticationActions.isAuthenticated, (state): AuthenticationState => {
//     console.log('Original State: ' + JSON.stringify(state));
//     return {
//       ...state,
//       email: state.email,
//       isAuthenticated: !state.isAuthenticated,
//       rememberMeCheckBox: !state.rememberMeCheckBox,
//     };
//   })
// );
