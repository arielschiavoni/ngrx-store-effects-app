import { createSelector } from '@ngrx/store';

import * as rootStore from '../../../app/store';
import * as feature from '../reducers';

import * as pizzasReducer from '../reducers/pizzas.reducer';
import * as toppingSelectors from './toppings.selectors';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

// we create selectors from the ProductsStates selector
export const getPizzaState = createSelector(feature.getProductsState, (state: feature.ProductsState) => state.pizzas);

export const getPizzaEntities = createSelector(getPizzaState, state => pizzasReducer.getPizzaEntities(state));

export const getSelectedPizza = createSelector(
  getPizzaEntities,
  rootStore.getRouterState,
  (entities, routerState): Pizza => routerState.state && entities[routerState.state.params.pizzaId]
);

// this selector combines pizza and toppings selectors!
export const getVisualisedPizza = createSelector(
  getSelectedPizza,
  toppingSelectors.getToppingEntities,
  toppingSelectors.getSelectedToppings,
  (pizza, toppingEntities, selectedTopping) => ({
    ...pizza,
    toppings: selectedTopping.map(id => toppingEntities[id])
  })
);

export const getAllPizzas = createSelector(getPizzaEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getPizzasLoading = createSelector(getPizzaState, pizzasReducer.getPizzasLoading);
export const getPizzasLoaded = createSelector(getPizzaState, pizzasReducer.getPizzasLoaded);
