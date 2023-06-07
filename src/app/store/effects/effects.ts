import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/_helpers/services/authentication.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class UIEffect {
  constructor(
    private _actions$: Actions,
    private _authenitcationService: AuthenticationService
  ) {}

  // logIn$ = createEffect(()=> this._actions$.ofType)
}
