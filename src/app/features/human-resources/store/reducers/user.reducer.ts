import { createReducer, on } from "@ngrx/store";

import { UserState } from "../state/user.state";
import * as UserActions from '../actions/user.actions';

const initialState: UserState = {
  currentUserId: NaN,
  userList: [],
  error: ''
}


export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.UserActions['[User]SetCurrentUserId'], (state, action) => {
    return {
      ...state,
      currentUserId: action.userId
    }
  }),
  on(UserActions.UserActions['[User]ClearCurrentUser'], (state) => {
    return {
      ...state,
      currentUserId: null
    }
  }),
  on(UserActions.UserActions['[User]InitializeCurrentUser'], (state) => {
    return {
      ...state,
      currentUserId: 0
    }
  }),
  on(UserActions.UserActions['[User]RetrieveUserList'], (state) => {
    return {
      ...state,
      userList: state.userList
    }
  }),
  on(UserActions.UserActions['[User]RetrieveUserListSuccess'], (state, action) => {
    return {
      ...state,
      userList: action.userList,
      error: ''
    }
  }),
  on(UserActions.UserActions['[User]RetrieveUserListFail'], (state, action) => {
    return {
      ...state,
      userList: [],
      error: action.errorMessage
    }
  })

)
