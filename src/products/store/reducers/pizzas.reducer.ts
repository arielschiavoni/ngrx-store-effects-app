import { Pizza } from '../../models/pizza.model';
import { PizzasAction, LOAD_PIZZAS, LOAD_PIZZAS_SUCCESS, LOAD_PIZZAS_FAIL } from '../actions/pizzas.action';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export const reducer = (state: PizzaState = initialState, action: PizzasAction): PizzaState => {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_PIZZAS_SUCCESS: {
      const entities = action.payload.reduce(
        (acc: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...acc,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }
    case LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
};

// selectors: they return a portion of the state
export const getPizzaEntities = (state: PizzaState) => state.entities;

export const getPizzasLoading = (state: PizzaState) => state.loading;

export const getPizzasLoaded = (state: PizzaState) => state.loaded;
