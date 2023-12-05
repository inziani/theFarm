import { createActionGroup, props } from '@ngrx/store';

export const UIActions = createActionGroup({
  source: 'UI Loading Page',
  events: {
    '[UILoadingPage] Start Loading': props<{ isLoading: boolean }>(),
    '[UILoadingPage] Stop Loading': props<{ isLoading: boolean }>(),
    '[UILoadingPage] No  Activity': props<{ isLoading: boolean }>(),
  },
});
