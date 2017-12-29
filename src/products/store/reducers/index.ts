import * as pizzasReducer from './pizzas.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductsState {
  pizzas: pizzasReducer.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer.reducer
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

// pizzas states
// we create selectors from the ProductsStates selector
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

// more selectors composition
export const getAllPizzasEntities = createSelector(getPizzaState, pizzasReducer.getPizzasEntities);
export const getAllPizzas = createSelector(getAllPizzasEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getPizzasLoading = createSelector(getPizzaState, pizzasReducer.getPizzasLoading);
export const getPizzasLoaded = createSelector(getPizzaState, pizzasReducer.getPizzasLoaded);
