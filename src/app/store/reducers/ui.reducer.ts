import { State } from '../state/ui.state';
import { UIActions } from '../actions/ui.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer<State>(
  initialState,

  on(UIActions['[UILoadingPage]StartLoading'], (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UIActions['[UILoadingPage]StopLoading'], (state) => ({
    ...state,
    isLoading: false,
  })),
  on(UIActions['[UILoadingPage]NoActivity'], () => initialState)
);
