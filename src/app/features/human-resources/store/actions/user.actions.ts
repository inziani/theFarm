import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    '[User] Set Current User Id': props<{ userId: number }>(),
    '[User] Clear Current User': emptyProps(),
    '[User] Initialize Current User': emptyProps(),
    '[User] Retrieve User List': emptyProps(),
    '[User] Retrieve User List Success': props<{ userList: User[] }>(),
    '[User] Retrieve User List Fail': props<{ errorMessage: string }>(),
  },
});
