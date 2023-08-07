import { JwTAuthenticationResponseInterface, JWTDecodedTokenInterface } from '../../models/authentication.model';
import * as AppState from '@app/store/state/app.state';

export interface State extends AppState.State {
  login: AuthenticationState;
}

export interface AuthenticationState {
  rememberMeCheckBox: boolean;
  maskUserEmail: boolean;
  jwtToken: JwTAuthenticationResponseInterface;
  jwtDecodedToken: JWTDecodedTokenInterface;
  isAuthenticated: boolean;
  error: string;
  isLoading: boolean;
}
