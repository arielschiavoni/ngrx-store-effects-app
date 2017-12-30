import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, map, catchError } from 'rxjs/operators';

import * as productsStore from '../store';
import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<productsStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => this.hasPizza(parseInt(route.params.pizzaId, 10))),
      catchError(() => of(false))
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store
      .select(productsStore.getPizzaEntities)
      .pipe(map((entities: { [id: number]: Pizza }) => !!entities[id]), take(1));
  }

  checkStore(): Observable<boolean> {
    return this.store.select(productsStore.getPizzasLoaded).pipe(
      // tap is only spying the stream to do some side effect but it does not modify the stream
      // of actions
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new productsStore.LoadPizzas());
        }
      }),
      // the idea of using filter and take(1) is that doing take(1) the observable is finished
      // and automatically unsubscribed. Is like saying "once the pizzas are loaded then we are done"
      filter(loaded => loaded),
      take(1)
    );
  }
}
