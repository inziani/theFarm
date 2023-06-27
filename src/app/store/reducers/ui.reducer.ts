// import { UIActions, START_LOADING, STOP_LOADING } from '../actions/ui.actions';
// import { NO_ACTION, START_LOADING, STOP_LOADING } from '../actions/ui.actions';

import * as UIActions from '../actions/ui.actions'
import { createReducer, on } from '@ngrx/store';

export interface UIState {
  isLoading: boolean;
}

export const initialState: UIState = {
  isLoading: false,
}

export const uiReducer = createReducer(
  initialState,

  on(UIActions.START_LOADING, state => ({...state, isLoading: true })),
  on( UIActions.STOP_LOADING, state  => ({...state, isLoading: true })),
  on(UIActions.NO_ACTION, () => initialState)
);



export const getIsLoading = (state: UIState) => state.isLoading;
