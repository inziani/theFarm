import {
  User,
  UserProfile,
} from '@app/features/human-resources/models/user.model';
import {
  JwTAuthenticationResponseInterface,
  UserLogin,
} from '../../models/authentication.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthenticationState } from '../state/authentication.state';

export const AuthenticationActions = createActionGroup({
  source: 'User',
  events: {
    '[Authentication] User LogIn': props<{ userLogin: UserLogin }>(),
    '[Authentication] Remember Me CheckBox': emptyProps(),
    '[Authentication] Mask User Email': emptyProps(),
    '[Authentication] User LogIn Sucess': props<{
      jwtToken: JwTAuthenticationResponseInterface;
    }>(),
    '[Authentication] User LogIn Fail': props<{
      errorMessage: string;
    }>(),
    // '[Authentication] User LogOut': props<{
    //   userLogInCredentials: UserLogin;
    // }>(),
    '[Authentication] User LogOut Sucess':
      emptyProps(),
      // jwtToken: JwTAuthenticationResponseInterface;
      // state: AuthenticationState
    // '[Authentication] User LogOut Fail': props<{
    //   errorMessage: string;
    //   jwtToken: JwTAuthenticationResponseInterface;
    // }>(),
    '[Authentication] Current User Id': props<{ userId: number }>(),
    '[Authentication] Fetch User Success': props<{ user: User }>(),
    '[Authentication] Fetch User Failure': props<{
      errorMessage: string;
    }>(),
    '[Authentication] Fetch User Profile Success': props<{
      userProfile: UserProfile;
    }>(),
    '[Authentication] Fetch User Profile  Failure': props<{
      errorMessage: string;
    }>(),
  },
});
