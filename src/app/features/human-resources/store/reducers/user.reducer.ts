import { createReducer, on } from '@ngrx/store';

import { UserState } from '../state/user.state';
import { UserActions } from '../actions/user.actions';

const initialState: UserState = {
  jwtToken: { refresh: '', access: '' },
  currentUserId: NaN,
  isAuthenticated: false,
  userList: [],
  error: '',
};

export const userReducer = createReducer<UserState>(
  initialState,

  on(UserActions['[User]RetrieveUserList'], (state) => {
    return {
      ...state,
      userList: state.userList,
    };
  }),
  on(UserActions['[User]RetrieveUserListSuccess'], (state, action) => {
    return {
      ...state,
      userList: action.userList,
      error: '',
    };
  }),
  on(UserActions['[User]RetrieveUserListFail'], (state, action) => {
    return {
      ...state,
      userList: [],
      error: action.errorMessage,
    };
  })
);
