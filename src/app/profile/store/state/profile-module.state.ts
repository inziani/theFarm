import { ActivityCategoryState } from "./activity-category.state";
import { ActivityState } from "./activity.state";


export interface ProfileModuleState {
  activity: ActivityState
  activityCategory: ActivityCategoryState
 }
