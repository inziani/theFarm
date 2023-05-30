import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from '@app/store/reducers/ui.reducer';

export interface UIState {
  ui: fromUi.UIState;
}


export const getUiStateFeature = createFeatureSelector<fromUi.UIState>('ui');
export const getIsLoading = createSelector(getUiStateFeature, fromUi.getIsLoading);
