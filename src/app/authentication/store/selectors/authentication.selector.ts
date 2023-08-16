import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from '../state/authentication.state';

const selectAuthenticationFeatures =
  createFeatureSelector<AuthenticationState>('authentication');

export const selectRememberMeCheckBox = createSelector(
  selectAuthenticationFeatures,
  (state) => state.rememberMeCheckBox
);

export const selectMaskUserEmail = createSelector(
  selectAuthenticationFeatures,
  (state) => state.maskUserEmail
);

export const selectIsAuthenticated = createSelector(
  selectAuthenticationFeatures,
  (state) => state?.isAuthenticated
);

export const selectError = createSelector(
  selectAuthenticationFeatures,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectAuthenticationFeatures,
  (state) => state.error
);

export const selectJwtToken = createSelector(
  selectAuthenticationFeatures,
  (state) => state?.jwtToken
);

export const selectCurrentUserId = createSelector(
  selectAuthenticationFeatures,
  (state) => state?.userId
);

export const selectUser = createSelector(
  selectAuthenticationFeatures,
  selectCurrentUserId,
  (state) => state.user
);

export const selectUserProfile = createSelector(
  selectAuthenticationFeatures,
  selectCurrentUserId,
  (state) => state.userProfile
);
