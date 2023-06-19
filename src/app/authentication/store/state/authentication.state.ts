import * as AppState from '@app/store/state/app.state';

export interface State extends AppState.State {
  login: AuthenticationLoginState;
}

export interface AuthenticationLoginState {
  rememberMeCheckBox: boolean;
  login: {
    userEmail: string;
    isAuthenticated: boolean;
  };
}
