import { Injectable } from '@angular/core';
import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ActivityActions,
  ActivityCategoryActions,
} from '../actions/profile.actions';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProfileEffects {
  // ngrxOnEffects() {
  //   return ActivityActions['[Activity]RetrieveActivityList']();
  // }

  public loadActivitiesEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityActions['[Activity]RetrieveActivityList']),
      mergeMap(() =>
        this._activityService.fetchActivityData().pipe(
          map((activityList) => {
            return ActivityActions['[Activity]RetrieveActivityListSuccess']({
              activityList,
            });
          }),
          catchError((error: string) =>
            of(
              ActivityActions['[Activity]RetrieveActivityListFailure']({
                errorMessage: error,
              })
            )
          )
        )
      )
    );
  });

  public loadActivityCategorysEffects = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        ActivityCategoryActions[
          '[ActivityCategory]RetrieveActivityCategoryList'
        ]
      ),
      mergeMap(() =>
        this._activityService.fetchActivityCategoryData().pipe(
          map((activityCategoryList) => {
            return ActivityCategoryActions[
              '[ActivityCategory]RetrieveActivityCategoryListSuccess'
            ]({ activityCategoryList });
          }),
          catchError((error: string) =>
            of(
              ActivityCategoryActions[
                '[ActivityCategory]RetrieveActivityCategoryListFailure'
              ]({ errorMessage: error })
            )
          )
        )
      )
    );
  });

  public createActivityEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityActions['[Activity]CreateActivity']),
      concatMap((action) =>
        this._activityService
          .addNewActivity(
            action.activity.title,
            action.activity.description,
            String(action.activity.activity_category),
            action.activity.status
          )
          .pipe(
            map((activity) =>
              ActivityActions['[Activity]CreateActivitySuccess']({
                activity,
              })
            ),
            catchError((error) =>
              of(
                ActivityActions['[Activity]CreateActivityFail']({
                  error,
                })
              )
            )
          )
      )
    );
  });

  public editActivityEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityActions['[Activity]EditActivity']),
      concatMap((action) =>
        this._activityService
          .editActivity(
            action.activity.id,
            action.activity.title,
            action.activity.description,
            action.activity.status,
            action.activity.activity_category
          )
          .pipe(
            map((activity) =>
              ActivityActions['[Activity]EditActivitySuccess']({
                activity,
              })
            ),
            catchError((error) =>
              of(
                ActivityActions['[Activity]EditActivityFail']({
                  error,
                })
              )
            )
          )
      )
    );
  });

  constructor(
    private _actions$: Actions,
    private _activityService: ActivitysService
  ) {}
}
