import { Injectable } from '@angular/core';
import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ActivityCategoryPageActions,
  ActivityCategoryAPIActions,
} from '../actions/activity-category.actions';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class ActivityCategoryEffects {
  public loadActivityCategorysEffects = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        ActivityCategoryPageActions['[ActivityCategory]LoadActivityCategories']
      ),
      concatMap(() =>
        this._activityService.fetchActivityCategoryData().pipe(
          map((activityCategoryList) => {
            return ActivityCategoryAPIActions[
              '[ActivityCategoryAPI]LoadActivityCategoriesSuccess'
            ]({ activityCategoryList });
          }),
          catchError((error: string) =>
            of(
              ActivityCategoryAPIActions[
                '[ActivityCategoryAPI]LoadActivityCategoriesFailure'
              ]({ errorMessage: error })
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
