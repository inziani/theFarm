import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.state';

const selectUserFeatureState = createFeatureSelector<UserState>('user');
export const selectCurrentUserId = createSelector(
  selectUserFeatureState,
  (state) => state.currentUserId
);
export const selectUserList = createSelector(
  selectUserFeatureState,
  (state) => state.userList
);
export const selectError = createSelector(
  selectUserFeatureState,
  (state) => state.error
);
export const currentUserData = createSelector(
  selectUserFeatureState,
  selectCurrentUserId,
  (state, selectCurrentUserId) => {
    return selectCurrentUserId
      ? state.userList.find((user) => user.id === selectCurrentUserId)
      : null;
  }
);
