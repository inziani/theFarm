import { ActionReducerMap } from '@ngrx/store';
import { ProfileModuleState } from '../state/profile-module.state';
import * as activityReducer from './acivity.reducer';
import * as activityCategoryReducer from './activity-category.reducer';

export const profileReducers: ActionReducerMap<ProfileModuleState> = {
  activity: activityReducer.activityReducer,
  activityCategory: activityCategoryReducer.activityCategoryReducer,
};
