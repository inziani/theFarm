import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationLoginState } from '../state/authentication.state';

const getlogin = createFeatureSelector<AuthenticationLoginState>('login');
export const getLogin = createSelector(getlogin, (state) => state.login);

const getrememberMeCheckBox =
  createFeatureSelector<AuthenticationLoginState>('remeberMeCheckBox');
export const getRememberMeCheckBox = createSelector(
  getrememberMeCheckBox,
  (state) => state.rememberMeCheckBox
);
