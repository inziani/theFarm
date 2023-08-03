import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.model';
// import {
//   JwTAuthenticationResponseInterface,
//   UserLogin,

// } from '@app/shared/interfaces/users-interface';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    // '[User] User LogIn': props<{ userLogInCredentials: UserLogin }>(),
    // '[User] User LogIn Sucess': props<{
    //   jwtToken: JwTAuthenticationResponseInterface;
    // }>(),
    // '[User] User LogIn Fail': props<{
    //   errorMessage: string;
    // }>(),
    // '[User] Set UserId LogIn Fail': props<{ errorMessage: string }>(),
    '[User] Retrieve User List': emptyProps(),
    '[User] Retrieve User List Success': props<{ userList: User[] }>(),
    '[User] Retrieve User List Fail': props<{ errorMessage: string }>(),
  },
});
