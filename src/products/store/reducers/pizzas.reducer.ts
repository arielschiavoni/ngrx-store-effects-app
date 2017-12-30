import { Pizza } from '../../models/pizza.model';
import * as pizzaActions from '../actions/pizzas.action';

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

export const reducer = (state: PizzaState = initialState, action: pizzaActions.PizzasAction): PizzaState => {
  switch (action.type) {
    case pizzaActions.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case pizzaActions.LOAD_PIZZAS_SUCCESS: {
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

    case pizzaActions.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case pizzaActions.CREATE_PIZZA_SUCCESS:
    case pizzaActions.UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;

      return {
        ...state,
        entities: { ...state.entities, [pizza.id]: pizza }
      };
    }

    case pizzaActions.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const { [pizza.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
};

// selectors: they return a portion of the state
export const getPizzaEntities = (state: PizzaState) => state.entities;

export const getPizzasLoading = (state: PizzaState) => state.loading;

export const getPizzasLoaded = (state: PizzaState) => state.loaded;
