import * as pizzasReducer from './pizzas.reducer';
import * as toppingsReducer from './toppings.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductsState {
  pizzas: pizzasReducer.PizzaState;
  toppings: toppingsReducer.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer.reducer,
  toppings: toppingsReducer.reducer
};

/*
Stepping into state tree through selector functions.
Example state:

const state = {
  // this is state slice corresponding to the current feature
  products: {
    // this is the slice state handled by the pizzas reducer
    pizzas: {
      data: [],
      loaded: false,
      loading: false
    }
  }
};
*/

// Create a root selector for the current feature
// This basically asks the global store for the state corresponding to the products feature registerd in `products.module.ts`
export const getProductsState = createFeatureSelector<ProductsState>('products');
