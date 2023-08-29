import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from '../state/profile.state';
import {
  selectActivities,
  selectCurrentActivityId,
  selectActivityDictionary,
} from '../reducers/profile.reducer';

const getActivityFeatureState =
  createFeatureSelector<ActivityState>('activity');

export const getCurrentActivityId = createSelector(
  getActivityFeatureState,
  selectCurrentActivityId
);

export const getActivityEntities = createSelector(
  getActivityFeatureState,
  selectActivityDictionary
);

export const getActivities = createSelector(
  getActivityFeatureState,
  selectActivities
);

export const getCurrentActivityDetails = createSelector(
  getActivityEntities,
  ()
);

export const getError = createSelector(
  getActivityFeatureState,
  (state) => state.error
);

// export const getCurrentActivityDetails = createSelector(
//   getActivityFeatureState,
//   getCurrentActivityId,
//   (state, currentActivityId) => {
//     return currentActivityId
//       ? state.activityList.find((activity) => activity.id === currentActivityId)
//       : null;
//   }
// );

// export const getCurrentActivity = createSelector(
//   getActivityFeatureState,
//   getCurrentActivityId,
//   (state, currentActivityId) => {
//     // Start here
//     if (currentActivityId === 0) {
//       return {
//         id: 0,
//         title: 'string',
//         description: 'string',
//         status: 'string',
//         activity_category: 0,
//       };
//     } else {
//       return currentActivityId
//         ? state.activityList.find((p) => p.id === currentActivityId)
//         : null;
//     }
//     // Ends here
//   }
// );

// export const currentActivityCategoryId = createSelector(
//   getActivityFeatureState,
//   (state) => state.currentActivityCategoryId
// );
// export const getActivityCategoryList = createSelector(
//   getActivityFeatureState,
//   (state) => state.activityCategoryList
// );
