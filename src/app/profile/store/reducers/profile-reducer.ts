import { ActionReducerMap } from '@ngrx/store';
import { ProfileModuleState } from '../state/profile-module.state';
import { activityReducer } from './acivity.reducer';
import { activityCategoryReducer } from './activity-category.reducer';

export const profileReducers: ActionReducerMap<ProfileModuleState> = {
  activity: activityReducer,
  activityCategory: activityCategoryReducer,
};
