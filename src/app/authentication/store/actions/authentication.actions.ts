import { createAction, props } from '@ngrx/store';

// export const userEmail = createAction('[Authentication] User Email');

export interface UserLogIn {
  userEmail: string;
  isAuthenticated: boolean;
}

export const rememberMeCheckBox = createAction(
  '[Authentication] Remember Me CheckBox'
);
export const maskUserEmail = createAction('[Authentication] Mask User Email');

export const logIn = createAction(
  '[AuthenticationUserLogin] User Login',
  props<{ userDetails: UserLogIn }>()
);
export const logOut = createAction('[AuthenticationUserLogOut] User LogOut');
