import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as productsStore from '../store';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<productsStore.ProductsState>) {}

  // the general idea is that angular will call this `canActivate` function when we navigate to a route
  // the checkStore function returns an stream of booleans that will be only piped once the
  // pizzas have been loaded. Until that happens `canActivate` will be waiting and the navigation
  // to the route will not happen.
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(switchMap(() => of(true)), catchError(() => of(false)));
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
