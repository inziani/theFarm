import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState } from '../state/activity.state';
// import {
//   selectActivities,
//   selectCurrentActivityId,

// } from '../reducers/acivity.reducer';

const selectActivityFeatureState =
  createFeatureSelector<ActivityState>('activity');

  export const selectLoading = createSelector(
    selectActivityFeatureState,
    (activityState) => activityState.loading
  );

export const selectActivities = createSelector(
  selectActivityFeatureState,
  (activityState) => activityState.activities
);

export const selectActivityId = createSelector(
  selectActivityFeatureState,
  (activityState) => activityState.activityId
);

export const selectActivityDetail = createSelector(
  selectActivityFeatureState,
  selectActivityId,
  (activityState, activityDetail) => {
    return activityDetail
      ? activityState.activities.find(
          (activity) => activity.id === activityDetail
        )
      : null;
  }
);

export const selectActivityErrorMessage = createSelector(
  selectActivityFeatureState,
  (activityState) => activityState.error
);



// export const getActivityEntities = createSelector(
//   getActivityFeatureState,
//   selectActivityDictionary
// );

// export const getCurrentActivityDetails = createSelector(
//   getActivityEntities,
//   ()
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
