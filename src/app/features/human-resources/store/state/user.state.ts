import * as AppState from '../../../../store/state/app.state'
import { User } from '../../models/user.model';

export interface State extends AppState.State{

}

export interface UserState{
  currentUserId: number | null;
  userList: User[];
  error: string;

}
