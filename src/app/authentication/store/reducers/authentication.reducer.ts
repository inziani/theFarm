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
  users: [],
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
  userProfiles: [],
  error: '',
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
    AuthenticationActions['[Authentication]FetchUserList'],
    (state): AuthenticationState => {
      return {
        ...state,
        users: state.users,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserListSuccess'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        users: action.users,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserListFailure'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        error: action.errorMessage,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserProfile'],
    (state): AuthenticationState => {
      return {
        ...state,
        userProfiles: state.userProfiles,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserProfileListSuccess'],
    (state, action): AuthenticationState => {
      return {
        ...state,
        userProfiles: action.userProfiles,
      };
    }
  ),
  on(
    AuthenticationActions['[Authentication]FetchUserProfileListFailure'],
    (state, action) => {
      return {
        ...state,
        error: action.errorMessage,
      };
    }
  )
);
