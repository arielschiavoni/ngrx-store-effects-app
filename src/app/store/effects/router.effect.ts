import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';

import * as routerActions from '../actions/router.action';
import { tap, map } from 'rxjs/operators';

// The idea is to listen router actions which need to execute side effects (navigate to some url using angular router)
@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router, private location: Location) {}

  // this effects are not going to dispatch new actions
  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(routerActions.GO).pipe(
    map((action: routerActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(routerActions.BACK).pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.ofType(routerActions.FORWARD).pipe(tap(() => this.location.forward()));
}
