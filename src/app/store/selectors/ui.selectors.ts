import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../state/ui.state';

export const getAppModuleStore = createFeatureSelector<State>('appModule');
export const selectIsLoading = createSelector(
  getAppModuleStore,
  (state) => state.isLoading
);
