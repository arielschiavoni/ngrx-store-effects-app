import { createSelector } from '@ngrx/store';

import * as rootStore from '../../../app/store';
import * as feature from '../reducers';
import * as toppingsReducer from '../reducers/toppings.reducer';

import { Topping } from '../../models/topping.model';

export const getToppingsState = createSelector(
  feature.getProductsState,
  (state: feature.ProductsState) => state.toppings
);

export const getToppingEntities = createSelector(getToppingsState, toppingsReducer.getToppingEntities);

export const getAllToppings = createSelector(getToppingEntities, entities =>
  Object.keys(entities).map(id => entities[parseInt(id, 10)])
);

export const getToppingsLoaded = createSelector(getToppingsState, toppingsReducer.getToppingsLoaded);

export const getToppingsLoading = createSelector(getToppingsState, toppingsReducer.getToppingsLoading);

export const getSelectedToppings = createSelector(getToppingsState, state =>
  toppingsReducer.getSelectedToppings(state)
);
