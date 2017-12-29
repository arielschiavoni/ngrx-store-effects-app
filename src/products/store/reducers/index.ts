import * as pizzasReducer from './pizzas.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface ProductsState {
  pizzas: pizzasReducer.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer.reducer
};
