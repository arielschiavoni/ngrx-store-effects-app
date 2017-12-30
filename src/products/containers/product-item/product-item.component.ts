import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as productsStore from '../../store';

@Component({
  selector: 'product-item',
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
    this.pizza$ = this.store.select(productsStore.getSelectedPizza);
    this.toppings$ = this.store.select(productsStore.getAllToppings);
    this.visualise$ = this.store.select(productsStore.getVisualisedPizza);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new productsStore.VisualiseToppings(event));
  }

  onCreate(event: Pizza) {}

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
