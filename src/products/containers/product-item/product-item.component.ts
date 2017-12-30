import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import * as productsStore from '../../store';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<productsStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(productsStore.getSelectedPizza).pipe(
      // here we want to intercept a pizza and if it is not a "new" pizza we want to trigger a VisualiseToppings action
      // to render them.
      tap((pizza: Pizza = null) => {
        // /products/new -> pizza === null -> toppings = []
        // /products/1 -> pizza === { id: 1, name: "peperoni", toppings: [{ id: 5, name: "olive" }] } -> toppings = [ 5 ]
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists ? pizza.toppings.map(t => t.id) : [];

        this.store.dispatch(new productsStore.VisualiseToppings(toppings));
      })
    );
    this.toppings$ = this.store.select(productsStore.getAllToppings);
    this.visualise$ = this.store.select(productsStore.getVisualisedPizza);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new productsStore.VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new productsStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new productsStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new productsStore.RemovePizza(event));
    }
  }
}
