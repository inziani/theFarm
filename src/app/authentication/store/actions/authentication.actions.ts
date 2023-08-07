import {
  JwTAuthenticationResponseInterface,
  UserLogin,
} from '../../models/authentication.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

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
    '[Authentication] User LogOut': props<{
      userLogInCredentials: UserLogin;
    }>(),
    '[Authentication] User LogOut Sucess': props<{
      jwtToken: JwTAuthenticationResponseInterface;
    }>(),
    '[Authentication] User LogOut Fail': props<{
      errorMessage: string;
    }>(),
    '[Authentication] Fetch User':emptyProps()
  },
});
