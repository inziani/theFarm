import { User, UserProfile } from '@app/features/human-resources/models/user.model';
import {
  JwTAuthenticationResponseInterface,
} from '../../models/authentication.model';
import * as AppState from '@app/store/state/app.state';

export interface State extends AppState.State {
  login: AuthenticationState;
}

export interface AuthenticationState {
  rememberMeCheckBox: boolean;
  maskUserEmail: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  jwtToken: JwTAuthenticationResponseInterface;
  userId: number;
  user: User;
  users: User[];
  userProfile: UserProfile;
  userProfiles: UserProfile[];
  error: string;


}
