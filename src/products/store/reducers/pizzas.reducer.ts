import { Pizza } from '../../models/pizza.model';
import { PizzasAction, LOAD_PIZZAS, LOAD_PIZZAS_SUCCESS, LoadPizzasFail } from '../actions/pizzas.action';

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false
};

export const reducer = (state = initialState, action: PizzasAction): PizzaState => {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_PIZZAS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true
      };
    }
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
};
