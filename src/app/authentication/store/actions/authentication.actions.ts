import {
  User,
  UserProfile,
} from '@app/features/human-resources/models/user.model';
import {
  AutoLoginUser,
  JWTDecodedTokenInterface,
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

    '[Authentication] User LogOut Sucess': emptyProps(),

    '[Authentication] User Auto Login': emptyProps(),
    '[Authentication] User Auto LogOut': emptyProps(),
    '[Authentication] User Auto Login Success': props<{
      jwtUser: JWTDecodedTokenInterface;

    }>(),
    '[Authentication] User Auto Login Failure ': props<{
      errorMessage: string;
    }>(),
    '[Authentication] Current User Id': props<{ userId: any }>(),
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
    '[Authentication] Unauthorized': props<{ navigationError: string }>(),
  },
});
