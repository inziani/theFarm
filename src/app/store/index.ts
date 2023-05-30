import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from './reducers/ui.reducer';

export interface UIState {
  ui: fromUi.UIState;
}

export const reducers: ActionReducerMap<UIState, any> = {
  ui: fromUi.uiReducer,
};

export const getUiState = createFeatureSelector<fromUi.UIState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
