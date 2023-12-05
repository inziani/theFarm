import { createReducer, on } from '@ngrx/store';
import { AuthenticationActions } from '../actions/authentication.actions';
import { AuthenticationState } from '../state/authentication.state';

export const initialLoginState: AuthenticationState = {
  rememberMeCheckBox: false,
  maskUserEmail: true,
  isLoading: false,
  isAuthenticated: false,
  jwtToken: { access: '', refresh: '' },
  userId: NaN,
  user: {
    id: NaN,
    username: '',
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    city: '',
    country: '',
    is_active: false,
    is_superuser: false,
    is_staff: false,
    staffType: '',
    date_joined: new Date(),
    password: '',
  },
  userProfile: {
    user: NaN,
    education_bio: '',
    professional_bio: '',
    professional_hobbies: '',
    personal_hobbies: '',
    social_hobbies: '',
    profile_pic: { url: '' },
    create_at: new Date(),
    updated_at: new Date(),
  },
  error: '',
  navigationError: '',
};

export const authenticationReducer = createReducer<AuthenticationState>(
  initialLoginState,
  on(AuthenticationActions['[Authentication]UserLogIn'], (state) => {
    return {
      ...state,
      // isLoading: !state.isLoading,
    };
  }),
  on(AuthenticationActions['[Authentication]LoadSpinner'], (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  }),
  on(
    AuthenticationActions['[Authentication]UserLogInSucess'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        jwtToken: action.jwtToken,
        isLoading: !state.isLoading,
        isAuthenticated: !state.isAuthenticated,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]UserLogInFail'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        isLoading: !state.isLoading,
        error: action.errorMessage,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]UserLogOutSucess'],
    (): AuthenticationState => {
      return {
        ...initialLoginState,
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
  on(
    AuthenticationActions['[Authentication]CurrentUserId'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        userId: action.userId,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserSuccess'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        user: action.user,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserFailure'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        error: action.errorMessage,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserProfileSuccess'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        userProfile: action.userProfile,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserProfileFailure'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        error: action.errorMessage,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]Unauthorized'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        navigationError: action.navigationError,
      };
    }
  )
);
