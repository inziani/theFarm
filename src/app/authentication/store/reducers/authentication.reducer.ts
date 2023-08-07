import { createReducer, on } from '@ngrx/store';

import { AuthenticationActions } from '../actions/authentication.actions';
import { AuthenticationState } from '../state/authentication.state';
import { JwtHelperService } from '@auth0/angular-jwt';

// import { BehaviorSubject, Observable } from 'rxjs';

// export class AuthenticationReduction {
const jwtHelper = new JwtHelperService();
//   public _loggedInUser$ = new BehaviorSubject<JWTDecodedTokenInterface>({
//     token_type: 'string',
//     exp: NaN,
//     iat: NaN,
//     jti: 'string',
//     user_id: NaN,
//   });
//   public readonly _loggedInUserData$: Observable<JWTDecodedTokenInterface> =
//     this._loggedInUser$.asObservable();

//   constructor() {}

  export const initialLoginState: AuthenticationState = {
    rememberMeCheckBox: false,
    maskUserEmail: true,
    jwtToken: { access: '', refresh: '' },
    jwtDecodedToken: {
      token_type: 'string',
      exp: NaN,
      iat: NaN,
      jti: 'string',
      user_id: NaN,
    },
    isAuthenticated: false,
    error: '',
    isLoading: false,
  };

  export const authenticationReducer = createReducer<AuthenticationState>(
    initialLoginState,
    on(AuthenticationActions['[Authentication]UserLogIn'], (state) => {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }),
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
    ),
  );

