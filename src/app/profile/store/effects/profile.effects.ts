import { Injectable } from '@angular/core';
import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ActivityActions from '../actions/profile.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
// import { Activity } from '@app/profile/todo/models/activity.model';

@Injectable()
export class ProfileEffects {
  constructor(
    private _actions$: Actions,
    private _activityService: ActivitysService
  ) {}

  public activityEffects$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        ActivityActions.ActivityActions[
          '[Activity]RetrievedActivityListSuccess'
        ]
      ),
      mergeMap(() =>
        this._activityService.fetchActivityData().pipe(
          map((activityList) => {
            return ActivityActions.ActivityActions[
              '[Activity]RetrievedActivityListSuccess'
            ]({ activityList });
          }),
          catchError((error: string) =>
            of(
              ActivityActions.ActivityActions[
                '[Activity]RetrieveActivityListFailure'
              ]({ errorMessage: error })
            )
          )
        )
      )
    );
  });
}
