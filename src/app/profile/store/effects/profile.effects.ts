import { Injectable } from '@angular/core';
import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ActivityActions from '../actions/profile.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Activity } from '@app/profile/todo/models/activity.model';

@Injectable()
export class ProfileEffects {
  constructor(
    private _actions$: Actions,
    private _activityService: ActivitysService
  ) {}

  public loadActivities$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(ActivityActions.fetchActivityDataSuccess),
      mergeMap(() =>
        this._activityService.fetchActivityData().pipe(
          map((activityList) =>
            ActivityActions.fetchActivityDataSuccess({
              activityList: activityList,
            })
          ),

            catchError((error) =>
              of(ActivityActions.fetchActivityDataFailure({ error }))
            )
          )
        )
      )
    );
  };

