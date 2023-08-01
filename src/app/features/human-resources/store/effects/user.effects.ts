import { Injectable } from '@angular/core';
import { UsersService } from '@app/_helpers/services/users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '../actions/user.actions';
import { catchError, mergeMap, map, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private _actions$: Actions, private _userService: UsersService) {}

  public loadUsersEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(UserActions['[User]RetrieveUserList']),
      mergeMap(() =>
        this._userService.fetchUsers().pipe(
          map((userList) => {
            return UserActions['[User]RetrieveUserListSuccess']({ userList });
          }),
          catchError((error: string) =>
            of(
              UserActions['[User]RetrieveUserListFail']({ errorMessage: error })
            )
          )
        )
      )
    );
  });
}
