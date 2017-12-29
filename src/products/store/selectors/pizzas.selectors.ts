import { createSelector } from '@ngrx/store';

import * as rootStore from '../../../app/store';
import * as feature from '../reducers';
import * as pizzasReducer from '../reducers/pizzas.reducer';
import { Pizza } from '../../models/pizza.model';

// we create selectors from the ProductsStates selector
export const getPizzaState = createSelector(feature.getProductsState, (state: feature.ProductsState) => state.pizzas);

// more selectors composition
export const getAllPizzasEntities = createSelector(getPizzaState, pizzasReducer.getPizzasEntities);

export const getSelectedPizza = createSelector(
  getAllPizzasEntities,
  rootStore.getRouterState,
  (entities, routerState): Pizza => routerState.state && entities[routerState.state.params.pizzaId]
);

export const getAllPizzas = createSelector(getAllPizzasEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getPizzasLoading = createSelector(getPizzaState, pizzasReducer.getPizzasLoading);
export const getPizzasLoaded = createSelector(getPizzaState, pizzasReducer.getPizzasLoaded);
