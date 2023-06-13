import * as AppState from '@app/store/state/app.state';
import { AuthenticationLoginState } from '../reducers/authentication.reducer';

export interface State extends AppState.State {
  login: AuthenticationLoginState;
}
