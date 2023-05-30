import {  createAction, props } from '@ngrx/store';
// import { Action, createAction, props } from '@ngrx/store';

// UI Loading
// export const START_LOADING = createAction('[UI] Start Loading');
// export const STOP_LOADING = createAction('[UI] Stop Loading');

export const START_LOADING = createAction(
  '[UI] Start Loading',
  props<{ isLoading: true }>()
);
export const STOP_LOADING = createAction(
  '[UI] Stop Loading',
  props<{ isLoading: false }>()
);
export const NO_ACTION = createAction('[UI] No Activity')

// UserLogin

export const LOGIN = createAction('[Login Page] Login', props<{ email: string, password: string }>());

// export class StartLoading implements Action {
//   readonly type = START_LOADING;
// }

// export class StopLoading implements Action {
//   readonly type = STOP_LOADING;
// }

// export type UIActions = StartLoading | StopLoading;
