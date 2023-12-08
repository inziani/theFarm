import {
  User,
  UserProfile,
} from '@app/features/human-resources/models/user.model';
import { JwTAuthenticationResponseInterface } from '../../models/authentication.model';
import * as AppState from '@app/store/state/ui.state';

export interface State extends AppState.State {
  login: AuthenticationState;
}

export interface AuthenticationState {
  rememberMeCheckBox: boolean;
  maskUserEmail: boolean;
  isAuthenticated: boolean;
  jwtToken: JwTAuthenticationResponseInterface;
  userId: number;
  user: User;
  userProfile: UserProfile;
  error: string;
  navigationError: string;
}
