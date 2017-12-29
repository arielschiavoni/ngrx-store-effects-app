import { Pizza } from '../../models/pizza.model';
import { PizzasAction, LOAD_PIZZAS, LOAD_PIZZAS_SUCCESS, LoadPizzasFail } from '../actions/pizzas.action';

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [
    {
      name: "Blazin' Inferno",
      toppings: [
        {
          id: 10,
          name: 'pepperoni'
        },
        {
          id: 9,
          name: 'pepper'
        },
        {
          id: 3,
          name: 'basil'
        },
        {
          id: 4,
          name: 'chili'
        },
        {
          id: 7,
          name: 'olive'
        },
        {
          id: 2,
          name: 'bacon'
        }
      ],
      id: 1
    },
    {
      name: "Seaside Surfin'",
      toppings: [
        {
          id: 6,
          name: 'mushroom'
        },
        {
          id: 7,
          name: 'olive'
        },
        {
          id: 2,
          name: 'bacon'
        },
        {
          id: 3,
          name: 'basil'
        },
        {
          id: 1,
          name: 'anchovy'
        },
        {
          id: 8,
          name: 'onion'
        },
        {
          id: 11,
          name: 'sweetcorn'
        },
        {
          id: 9,
          name: 'pepper'
        },
        {
          id: 5,
          name: 'mozzarella'
        }
      ],
      id: 2
    },
    {
      name: "Plain Ol' Pepperoni",
      toppings: [
        {
          id: 10,
          name: 'pepperoni'
        }
      ],
      id: 3
    }
  ],
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

// selectors: they return a portion of the state
export const getPizzasLoading = (state: PizzaState) => state.loading;

export const getPizzasLoaded = (state: PizzaState) => state.loaded;

export const getPizzas = (state: PizzaState) => state.data;
