import { JwTAuthenticationResponseInterface } from '../../../../authentication/models/authentication.model';
import * as AppState from '../../../../store/state/ui.state';
import { User } from '../../models/user.model';

export interface State extends AppState.State {}

export interface UserState {
  jwtToken: JwTAuthenticationResponseInterface;
  currentUserId: number | null;
  isAuthenticated: boolean;
  userList: User[];
  error: string;
}
