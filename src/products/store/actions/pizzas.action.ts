import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// load pizzas
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;

  constructor(public payload: Pizza[]) {}
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;

  constructor(public payload: any) {}
}

// create pizzas
export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Success';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Fail';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;

  constructor(public payload: Pizza) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;

  constructor(public payload: any) {}
}

// action types
export type PizzasAction =
  | LoadPizzas
  | LoadPizzasSuccess
  | LoadPizzasFail
  | CreatePizza
  | CreatePizzaSuccess
  | CreatePizzaFail;
