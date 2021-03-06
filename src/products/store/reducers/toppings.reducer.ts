import { Topping } from '../../models/topping.model';
import {
  ToppingsAction,
  LOAD_TOPPINGS,
  LOAD_TOPPINGS_SUCCESS,
  LOAD_TOPPINGS_FAIL,
  VISUALISE_TOPPINGS
} from '../actions/toppings.action';

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export const reducer = (state: ToppingsState = initialState, action: ToppingsAction): ToppingsState => {
  switch (action.type) {
    case LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_TOPPINGS_SUCCESS: {
      const entities = action.payload.reduce(
        (acc: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...acc,
            [topping.id]: topping
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

    case LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case VISUALISE_TOPPINGS: {
      return {
        ...state,
        selectedToppings: action.payload
      };
    }
  }

  return state;
};

export const getToppingEntities = (state: ToppingsState) => state.entities;

export const getToppingsLoaded = (state: ToppingsState) => state.loaded;

export const getToppingsLoading = (state: ToppingsState) => state.loading;

export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
