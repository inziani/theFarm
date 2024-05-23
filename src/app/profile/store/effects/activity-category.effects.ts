import { Injectable } from '@angular/core';
import { ActivitysService } from '@app/_helpers/services/activitys.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ActivityCategoryPageActions,
  ActivityCategoryAPIActions,
} from '../actions/activity-category.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ActivityCategoryEffects {
  public loadActivityCategorysEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        ActivityCategoryPageActions[
          '[ActivityCategoryPage]LoadActivityCategories'
        ]
      ),
      exhaustMap(() =>
        this._activityService.fetchActivityCategoryData().pipe(
          map((activityCategories) => {
            return ActivityCategoryAPIActions[
              '[ActivityCategoryAPI]LoadActivityCategoriesSuccess'
            ]({ activityCategories });
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

  public createActivityCategoryEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        ActivityCategoryPageActions[
          '[ActivityCategoryPage]CreateActivityCategory'
        ]
      ),
      mergeMap((action) =>
        this._activityService
          .addNewActivityCategory(
            action.activityCategory.title,
            action.activityCategory.description,
            action.activityCategory.category
          )
          .pipe(
            map((activityCategory) =>
              ActivityCategoryAPIActions[
                '[ActivityCategoryAPI]CreateActivityCategorySuccess'
              ]({ activityCategory })
            ),
            catchError((errorMessage) =>
              of(
                ActivityCategoryAPIActions[
                  '[ActivityCategoryAPI]CreateActivityCategoryFail'
                ]({ errorMessage })
              )
            )
          )
      )
    );
  });

  public editActivityCategoryEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        ActivityCategoryPageActions[
          '[ActivityCategoryPage]EditActivityCategory'
        ]
      ),
      concatMap((action) =>
        this._activityService
          .editActivityCategory(
            action.activityCategory.id,
            action.activityCategory.title,
            action.activityCategory.description,
            action.activityCategory.category
          )
          .pipe(
            map((activityCatagory) =>
              ActivityCategoryAPIActions[
                '[ActivityCategoryAPI]EditActivityCategorySuccess'
              ]({
                activityCategory: {
                  id: activityCatagory.id,
                  changes: activityCatagory,
                },
              })
            ),
            catchError((errorMessage) =>
              of(
                ActivityCategoryAPIActions[
                  '[ActivityCategoryAPI]EditActivityCategoryFail'
                ]({
                  errorMessage,
                })
              )
            )
          )
      )
    );
  });

  public deleteActivityCategoryEffect$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        ActivityCategoryPageActions[
          '[ActivityCategoryPage]DeleteActivityCategory'
        ]
      ),
      mergeMap(({ activityCategoryId }) =>
        this._activityService.deleteActivityCategory(activityCategoryId).pipe(
          map(() =>
            ActivityCategoryAPIActions[
              '[ActivityCategoryAPI]DeleteActivityCategorySuccess'
            ]({
              activityCategoryId,
            })
          ),
          catchError((errorMessage) =>
            of(
              ActivityCategoryAPIActions[
                '[ActivityCategoryAPI]DeleteActivityCategoryFail'
              ]({
                errorMessage,
              })
            )
          )
        )
      )
    );
  });

  // redirectToActivityCategoryPage = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(
  //       ActivityCategoryAPIActions[
  //         '[ActivityCategoryAPI]CreateActivityCategorySuccess'
  //       ],
  //       ActivityCategoryAPIActions[
  //         '[ActivityCategoryAPI]EditActivityCategorySuccess'
  //       ],
  //       ActivityCategoryAPIActions[
  //         '[ActivityCategoryAPI]DeleteActivityCategorySuccess'
  //       ]
  //     ),
  //     tap(() => this._router.navigate(['/home']))
  //   )
  // );

  constructor(
    private _actions$: Actions,
    private _activityService: ActivitysService,
    private _router: Router
  ) {}
}
