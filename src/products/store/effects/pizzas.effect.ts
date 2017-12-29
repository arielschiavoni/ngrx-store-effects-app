import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as pizzaActions from '../actions/pizzas.action';
import * as services from '../../services';

// The idea is to listen some type of actions from the store which need to execute side effects. Then run the
// side effects (requests to the server) trigger new actions.
@Injectable()
export class PizzaEffects {
  constructor(private actions$: Actions, private pizzaService: services.PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        // map success response to the LoadPizzasSuccess action
        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
        // map error response to the LoadPizzasFail action
        catchError(err => of(new pizzaActions.LoadPizzasFail(err)))
      );
    })
  );
}
