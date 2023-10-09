import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  // tap,
} from 'rxjs';

import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ActivityPageActions,
  ActivityAPIActions,
} from '../actions/activity.actions';
// import { Router } from '@angular/router';

@Injectable()
export class ActivityEffects {
  public loadActivitiesEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityPageActions['[ActivityPage]LoadActivities']),
      exhaustMap(() =>
        this._activityService.fetchActivityData().pipe(
          map((activities) => {
            return ActivityAPIActions['[ActivityAPI]LoadActivitesSuccess']({
              activities,
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
            catchError((errorMessage) =>
              of(
                ActivityAPIActions['[ActivityAPI]CreateActivityFail']({
                  errorMessage,
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
                activity: { id: activity.id, changes: activity },
              })
            ),
            catchError((errorMessage) =>
              of(
                ActivityAPIActions['[ActivityAPI]EditActivityFail']({
                  errorMessage
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
      mergeMap(({ activityId }) =>
        this._activityService.deleteActivity(activityId).pipe(
          map(() =>
            ActivityAPIActions['[ActivityAPI]DeleteActivitySuccess']({
              activityId,
            })
          ),
          catchError((errorMessage) =>
            of(
              ActivityAPIActions['[ActivityAPI]CreateActivityFail']({
                errorMessage,
              })
            )
          )
        )
      )
    );
  });

  // redirectToActivityPage = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(
  //       ActivityAPIActions['[ActivityAPI]CreateActivitySuccess'],
  //       ActivityAPIActions['[ActivityAPI]EditActivitySuccess'],
  //       ActivityAPIActions['[ActivityAPI]DeleteActivitySuccess']
  //     ),
  //     tap(() => this._router.navigate(['/profile']))
  //   )
  // );

  constructor(
    private _actions$: Actions,
    private _activityService: ActivitysService,
    // private _router: Router
  ) {}
}
