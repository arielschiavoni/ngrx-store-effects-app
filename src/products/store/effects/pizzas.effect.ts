import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as routerActions from '../../../app/store/actions/router.action';
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

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
          catchError(err => of(new pizzaActions.CreatePizzaFail(err)))
        );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(pizza => new routerActions.Go({ path: ['/products', pizza.id] }))
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
          catchError(err => of(new pizzaActions.UpdatePizzaFail(err)))
        );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .removePizza(pizza)
        .pipe(
          map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
          catchError(err => of(new pizzaActions.RemovePizzaFail(err)))
        );
    })
  );
}
