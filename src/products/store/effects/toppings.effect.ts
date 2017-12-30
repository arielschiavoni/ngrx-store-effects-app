import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as toppingsActions from '../actions/toppings.action';
import * as services from '../../services';

@Injectable()
export class ToppingsEffects {
  constructor(private actions$: Actions, private toppingServices: services.ToppingsService) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingServices
        .getToppings()
        .pipe(
          map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
          catchError(err => of(new toppingsActions.LoadToppingsFail(err)))
        );
    })
  );
}
