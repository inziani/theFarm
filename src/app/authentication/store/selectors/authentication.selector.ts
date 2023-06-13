import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationLoginState } from '../reducers/authentication.reducer';

const getlogin = createFeatureSelector<AuthenticationLoginState>('login');
export const getLogin = createSelector(getlogin, (state) => state.login);

const getrememberMeCheckBox =
  createFeatureSelector<AuthenticationLoginState>('remeberMeCheckBox');
export const getRememberMeCheckBox = createSelector(
  getrememberMeCheckBox,
  (state) => state.rememberMeCheckBox
);
