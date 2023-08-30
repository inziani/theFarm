import { Injectable } from '@angular/core';
import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ActivityPageActions,
  ActivityAPIActions,
} from '../actions/activity.actions';

import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ActivityEffects {
  public loadActivitiesEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityPageActions['[ActivityPage]LoadActivities']),
      exhaustMap(() =>
        this._activityService.fetchActivityData().pipe(
          map((activityList) => {
            return ActivityAPIActions['[ActivityAPI]LoadActivitesSuccess']({
              activityList,
            });
          }),
          catchError((error: string) =>
            of(
              ActivityAPIActions['[ActivityAPI]LoadActivitiesFailure']({
                errorMessage: error,
              })
            )
          )
        )
      )
    );
  });

  public createActivityEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityPageActions['[ActivityPage]CreateActivity']),
      mergeMap((action) =>
        this._activityService
          .addNewActivity(
            action.activity.title,
            action.activity.description,
            String(action.activity.activity_category),
            action.activity.status
          )
          .pipe(
            map((activity) =>
              ActivityAPIActions['[ActivityAPI]CreateActivitySuccess']({
                activity,
              })
            ),
            catchError((error) =>
              of(
                ActivityAPIActions['[ActivityAPI]CreateActivityFail']({
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
      ofType(ActivityPageActions['[ActivityPage]EditActivity']),
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
              ActivityAPIActions['[ActivityAPI]EditActivitySuccess']({
                activityUpdate: { id: activity.id, changes: activity },
              })
            ),
            catchError((error) =>
              of(
                ActivityAPIActions['[ActivityAPI]EditActivityFail']({
                  error,
                })
              )
            )
          )
      )
    );
  });

  public deleteActivityEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityPageActions['[ActivityPage]DeleteActivity']),
      mergeMap((activityId) =>
        this._activityService.deleteActivity(activityId.activityId).pipe(
          map(() =>
            ActivityAPIActions['[ActivityAPI]DeleteActivitySuccess']()
          ),
          catchError((error) =>
            of(
              ActivityAPIActions['[ActivityAPI]CreateActivityFail']({
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
